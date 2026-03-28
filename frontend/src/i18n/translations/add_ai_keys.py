#!/usr/bin/env python3
"""
Add missing AI translation keys to all language files
This ensures all languages have the new AI analyzer fields
"""

import json
import os
from pathlib import Path

# New AI translation keys (from en.json)
NEW_AI_KEYS = {
    "analyzing": "Analyzing image...",
    "validIssue": "Valid Issue",
    "notCivicIssue": "Not a Civic Issue",
    "category": "Category",
    "severity": "Severity",
    "confidence": "Confidence",
    "department": "Department",
    "title": "Issue Summary",
    "description": "Description",
    "visualEvidence": "Visual Evidence",
    "estimatedImpact": "Estimated Impact",
    "aiRecommendations": "AI Recommendations",
    "locationClues": "Location Information",
    "peopleAffected": "People Affected",
    "urgencyDays": "Resolution Target",
    "safetyRisk": "Safety Risk",
    "trafficImpact": "Traffic Impact",
    "immediateAction": "Immediate Action",
    "permanentFix": "Permanent Fix",
    "estimatedRepairTime": "Estimated Repair Time",
    "estimatedCostINR": "Estimated Cost (INR)",
    "requiredResources": "Required Resources",
    "suggestedATR": "Suggested Report"
}

# Translations for major languages
TRANSLATIONS = {
    "hi": {
        "analyzing": "छवि विश्लेषण जारी है...",
        "validIssue": "मान्य समस्या",
        "notCivicIssue": "नागरिक समस्या नहीं",
        "title": "समस्या सारांश",
        "description": "विवरण",
        "visualEvidence": "दृश्य साक्ष्य",
        "estimatedImpact": "अनुमानित प्रभाव",
        "aiRecommendations": "AI सिफारिशें",
        "locationClues": "स्थान जानकारी",
        "peopleAffected": "प्रभावित लोग",
        "urgencyDays": "समाधान लक्ष्य",
        "safetyRisk": "सुरक्षा जोखिम",
        "trafficImpact": "ट्रैफिक प्रभाव",
        "immediateAction": "तत्काल कार्रवाई",
        "permanentFix": "स्थायी समाधान",
        "estimatedRepairTime": "अनुमानित मरम्मत समय",
        "estimatedCostINR": "अनुमानित लागत (INR)",
        "requiredResources": "आवश्यक संसाधन",
        "suggestedATR": "सुझाए गए रिपोर्ट"
    },
    "fr": {
        "analyzing": "Analyse d'image en cours...",
        "validIssue": "Problème Valide",
        "notCivicIssue": "Pas un Problème Civique",
        "title": "Résumé du Problème",
        "description": "Description",
        "visualEvidence": "Preuves Visuelles",
        "estimatedImpact": "Impact Estimé",
        "aiRecommendations": "Recommandations IA",
        "locationClues": "Informations de Localisation",
        "peopleAffected": "Personnes Affectées",
        "urgencyDays": "Objectif de Résolution",
        "safetyRisk": "Risque de Sécurité",
        "trafficImpact": "Impact sur le Trafic",
        "immediateAction": "Action Immédiate",
        "permanentFix": "Solution Permanente",
        "estimatedRepairTime": "Temps de Réparation Estimé",
        "estimatedCostINR": "Coût Estimé (INR)",
        "requiredResources": "Ressources Requises",
        "suggestedATR": "Rapport Suggéré"
    },
    "es": {
        "analyzing": "Analizando imagen...",
        "validIssue": "Problema Válido",
        "notCivicIssue": "No es un Problema Cívico",
        "title": "Resumen del Problema",
        "description": "Descripción",
        "visualEvidence": "Evidencia Visual",
        "estimatedImpact": "Impacto Estimado",
        "aiRecommendations": "Recomendaciones IA",
        "locationClues": "Información de Ubicación",
        "peopleAffected": "Personas Afectadas",
        "urgencyDays": "Objetivo de Resolución",
        "safetyRisk": "Riesgo de Seguridad",
        "trafficImpact": "Impacto en el Tráfico",
        "immediateAction": "Acción Inmediata",
        "permanentFix": "Solución Permanente",
        "estimatedRepairTime": "Tiempo de Reparación Estimado",
        "estimatedCostINR": "Costo Estimado (INR)",
        "requiredResources": "Recursos Requeridos",
        "suggestedATR": "Informe Sugerido"
    },
    "de": {
        "analyzing": "Bildanalyse läuft...",
        "validIssue": "Gültiges Problem",
        "notCivicIssue": "Kein Bürgerproblem",
        "title": "Problemzusammenfassung",
        "description": "Beschreibung",
        "visualEvidence": "Visuelle Beweise",
        "estimatedImpact": "Geschätzter Einfluss",
        "aiRecommendations": "KI-Empfehlungen",
        "locationClues": "Standortinformationen",
        "peopleAffected": "Betroffene Personen",
        "urgencyDays": "Lösungsziel",
        "safetyRisk": "Sicherheitsrisiko",
        "trafficImpact": "Auswirkungen auf den Verkehr",
        "immediateAction": "Sofortige Maßnahme",
        "permanentFix": "Permanente Lösung",
        "estimatedRepairTime": "Geschätzte Reparaturzeit",
        "estimatedCostINR": "Geschätzte Kosten (INR)",
        "requiredResources": "Erforderliche Ressourcen",
        "suggestedATR": "Vorgeschlagener Bericht"
    },
    "pt": {
        "analyzing": "Analisando imagem...",
        "validIssue": "Problema Válido",
        "notCivicIssue": "Não é um Problema Cívico",
        "title": "Resumo do Problema",
        "description": "Descrição",
        "visualEvidence": "Evidência Visual",
        "estimatedImpact": "Impacto Estimado",
        "aiRecommendations": "Recomendações de IA",
        "locationClues": "Informações de Localização",
        "peopleAffected": "Pessoas Afetadas",
        "urgencyDays": "Objetivo de Resolução",
        "safetyRisk": "Risco de Segurança",
        "trafficImpact": "Impacto no Trânsito",
        "immediateAction": "Ação Imediata",
        "permanentFix": "Solução Permanente",
        "estimatedRepairTime": "Tempo de Reparo Estimado",
        "estimatedCostINR": "Custo Estimado (INR)",
        "requiredResources": "Recursos Necessários",
        "suggestedATR": "Relatório Sugerido"
    }
}

def add_ai_keys_to_file(file_path, lang_code):
    """Add missing AI keys to a language file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Check if ai key exists
        if 'ai' not in data:
            data['ai'] = {}
        
        # Get translations for this language or use English as fallback
        lang_translations = TRANSLATIONS.get(lang_code, NEW_AI_KEYS)
        
        # Add missing keys
        for key, value in NEW_AI_KEYS.items():
            if key not in data['ai']:
                # Use language-specific translation if available, otherwise English
                data['ai'][key] = lang_translations.get(key, value)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        return True
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

# Process all language files
translation_dir = Path(__file__).parent
json_files = sorted(translation_dir.glob('*.json'))

print(f"Processing {len(json_files)} language files to add AI keys...\n")

updated = 0
for json_file in json_files:
    if json_file.name == 'checkTranslations.py' or json_file.name.endswith('.py'):
        continue
    
    lang_code = json_file.stem
    if add_ai_keys_to_file(json_file, lang_code):
        print(f"✓ {json_file.name}: Added AI keys")
        updated += 1

print(f"\n✓ Successfully updated {updated} language files with AI keys!")
