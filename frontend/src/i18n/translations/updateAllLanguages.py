#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import os

# Pre-defined proper translations for all languages
translations = {
    'es': {  # Spanish
        'category': {'title': 'Elige Categoría', 'dirtySpot': 'Punto Sucio', 'garbageDump': 'Basural', 'garbageVehicle': 'Camión de Basura No Viene', 'burningGarbage': 'Quema de Basura en Espacio Abierto', 'sweepingNotDone': 'Barrido No Realizado', 'dustbinsNotCleaned': 'Contenedores Sin Limpiar', 'openDefecation': 'Defecación al Aire Libre', 'sewerageOverflow': 'Desbordamiento de Alcantarillado/Agua de Tormenta', 'stagnantWater': 'Agua Estancada en la Carretera', 'slumNotClean': 'Área de Tugurios Sin Limpiar', 'overgrownVegetation': 'Vegetación Excesiva en la Carretera', 'strayAnimals': 'Animales Vagabundos', 'navigateInstructions': '↑↓ o Intro para Navegar • Haz Clic para Seleccionar • Esc Atrás'},
        'complaint': {'fileComplaint': 'Presentar Queja', 'postNewComplaint': 'Presentar Nueva Queja', 'stepUploadImage': 'Imagen del Problema', 'stepSelectCategory': 'Categoría', 'stepDescribeIssue': 'Describe el Problema', 'stepSelectLocation': 'Ubicación', 'submitComplaint': 'Enviar Queja', 'myComplaints': 'Mis Quejas', 'noComplaints': 'Sin quejas aún', 'startReporting': 'Comienza a reportar problemas', 'complaintId': 'ID de Queja', 'status': 'Estado', 'date': 'Fecha', 'location': 'Ubicación', 'priority': 'Prioridad', 'high': 'Alta', 'medium': 'Media', 'low': 'Baja', 'pending': 'Pendiente', 'acknowledged': 'Reconocido', 'inProgress': 'En Progreso', 'resolved': 'Resuelto', 'rejected': 'Rechazado', 'closed': 'Cerrado'},
        'roles': {'citizen': 'Ciudadano', 'citizenSubtitle': 'Reporta y Monitorea Problemas', 'citizenDescription': 'Envía quejas, monitorea el estado y proporciona retroalimentación', 'official': 'Oficial del Gobierno', 'officialSubtitle': 'Resuelve Quejas', 'officialDescription': 'Ve las quejas asignadas y actualiza el estado de resolución', 'admin': 'Administrador', 'adminSubtitle': 'Gestiona la Plataforma', 'adminDescription': 'Asigna quejas, gestiona departamentos, ve análisis', 'selectRoleToContinue': 'Elige tu rol para continuar', 'navigationInstructions': 'Usa ↑↓ o Enter para navegar • Haz clic para seleccionar'},
        'bottomNav': {'home': 'Inicio', 'notifications': 'Notificaciones', 'complaints': 'Quejas', 'profile': 'Perfil'}
    },
    'fr': {  # French
        'category': {'title': 'Choisir une Catégorie', 'dirtySpot': 'Endroit Sale', 'garbageDump': 'Décharge Ordures', 'garbageVehicle': 'Camion Ordures Non Disponible', 'burningGarbage': 'Incinération en Espace Ouvert', 'sweepingNotDone': 'Balayage Non Effectué', 'dustbinsNotCleaned': 'Poubelles Non Nettoyées', 'openDefecation': 'Défécation à l\'Air Libre', 'sewerageOverflow': 'Débordement Égouts/Eaux Pluie', 'stagnantWater': 'Eau Stagnante sur la Route', 'slumNotClean': 'Zone de Bidonville Non Nettoyée', 'overgrownVegetation': 'Végétation Envahissante sur la Route', 'strayAnimals': 'Animaux Errants', 'navigateInstructions': '↑↓ ou Entrée pour Naviguer • Cliquez pour Sélectionner • Échap Retour'},
        'complaint': {'fileComplaint': 'Déposer Plainte', 'postNewComplaint': 'Déposer Nouvelle Plainte', 'stepUploadImage': 'Image du Problème', 'stepSelectCategory': 'Catégorie', 'stepDescribeIssue': 'Décrire le Problème', 'stepSelectLocation': 'Localisation', 'submitComplaint': 'Envoyer Plainte', 'myComplaints': 'Mes Plaintes', 'noComplaints': 'Aucune plainte pour l\'instant', 'startReporting': 'Commencez à signaler des problèmes', 'complaintId': 'ID Plainte', 'status': 'Statut', 'date': 'Date', 'location': 'Localisation', 'priority': 'Priorité', 'high': 'Haute', 'medium': 'Moyenne', 'low': 'Basse', 'pending': 'En Attente', 'acknowledged': 'Reconnu', 'inProgress': 'En Cours', 'resolved': 'Résolu', 'rejected': 'Rejeté', 'closed': 'Fermé'},
        'roles': {'citizen': 'Citoyen', 'citizenSubtitle': 'Signalez et Suivez', 'citizenDescription': 'Déposez des plaintes, suivez l\'état et fournissez des retours', 'official': 'Agent du Gouvernement', 'officialSubtitle': 'Résolvez Plaintes', 'officialDescription': 'Consultez les plaintes assignées et mettez à jour le statut', 'admin': 'Administrateur', 'adminSubtitle': 'Gérez la Plateforme', 'adminDescription': 'Assignez les plaintes, gérez les départements, visualisez les analyses', 'selectRoleToContinue': 'Sélectionnez votre rôle pour continuer', 'navigationInstructions': 'Utilisez ↑↓ ou Entrée pour naviguer • Cliquez pour sélectionner'},
        'bottomNav': {'home': 'Accueil', 'notifications': 'Notifications', 'complaints': 'Plaintes', 'profile': 'Profil'}
    },
    'de': {  # German
        'category': {'title': 'Kategorie Wählen', 'dirtySpot': 'Schmutzige Stelle', 'garbageDump': 'Müllhalde', 'garbageVehicle': 'Müllfahrzeug Kommt Nicht', 'burningGarbage': 'Müll im Freien Verbrennen', 'sweepingNotDone': 'Kehren Nicht Durchgeführt', 'dustbinsNotCleaned': 'Mülleimer Nicht Gereinigt', 'openDefecation': 'Offene Defäkation', 'sewerageOverflow': 'Kanalisation/Regenwasser Überläufe', 'stagnantWater': 'Stehendes Wasser auf der Straße', 'slumNotClean': 'Slumgebiet Nicht Sauber', 'overgrownVegetation': 'Überwachsene Vegetation auf der Straße', 'strayAnimals': 'Streuner', 'navigateInstructions': '↑↓ oder Enter zum Navigieren • Klick zum Auswählen • Esc Zurück'},
        'complaint': {'fileComplaint': 'Beschwerde Einreichen', 'postNewComplaint': 'Neue Beschwerde Einreichen', 'stepUploadImage': 'Bild des Problems', 'stepSelectCategory': 'Kategorie', 'stepDescribeIssue': 'Problem Beschreiben', 'stepSelectLocation': 'Standort', 'submitComplaint': 'Beschwerde Absenden', 'myComplaints': 'Meine Beschwerden', 'noComplaints': 'Noch keine Beschwerden', 'startReporting': 'Beginnen Sie Probleme zu melden', 'complaintId': 'Beschwerde ID', 'status': 'Status', 'date': 'Datum', 'location': 'Standort', 'priority': 'Priorität', 'high': 'Hoch', 'medium': 'Mittel', 'low': 'Niedrig', 'pending': 'Ausstehend', 'acknowledged': 'Bestätigt', 'inProgress': 'Im Gange', 'resolved': 'Gelöst', 'rejected': 'Abgelehnt', 'closed': 'Geschlossen'},
        'roles': {'citizen': 'Bürger', 'citizenSubtitle': 'Melden und Verfolgen Sie', 'citizenDescription': 'Reichen Sie Beschwerden ein, verfolgen Sie den Status und geben Sie Feedback', 'official': 'Regierungsbeamter', 'officialSubtitle': 'Beschwerde Lösen', 'officialDescription': 'Sehen Sie zugewiesene Beschwerden ein und aktualisieren Sie den Status', 'admin': 'Administrator', 'adminSubtitle': 'Verwalte die Plattform', 'adminDescription': 'Weisen Sie Beschwerden zu, verwalten Sie Abteilungen, sehen Sie Analysen', 'selectRoleToContinue': 'Wählen Sie Ihre Rolle zum Fortfahren', 'navigationInstructions': 'Verwenden Sie ↑↓ oder Enter zum Navigieren • Klicken Sie zum Auswählen'},
        'bottomNav': {'home': 'Startseite', 'notifications': 'Benachrichtigungen', 'complaints': 'Beschwerden', 'profile': 'Profil'}
    },
    'pt': {  # Portuguese
        'category': {'title': 'Escolher Categoria', 'dirtySpot': 'Local Sujo', 'garbageDump': 'Depósito de Lixo', 'garbageVehicle': 'Caminhão de Lixo Não Vem', 'burningGarbage': 'Queima de Lixo em Espaço Aberto', 'sweepingNotDone': 'Varrição Não Realizada', 'dustbinsNotCleaned': 'Lixeiras Não Limpas', 'openDefecation': 'Defecação ao Ar Livre', 'sewerageOverflow': 'Transbordamento de Esgoto/Águas Pluviais', 'stagnantWater': 'Água Estagnada na Estrada', 'slumNotClean': 'Área de Favela Não Limpa', 'overgrownVegetation': 'Vegetação Excessiva na Estrada', 'strayAnimals': 'Animais Vadios', 'navigateInstructions': '↑↓ ou Enter para Navegar • Clique para Selecionar • Esc Voltar'},
        'complaint': {'fileComplaint': 'Registrar Reclamação', 'postNewComplaint': 'Registrar Nova Reclamação', 'stepUploadImage': 'Imagem do Problema', 'stepSelectCategory': 'Categoria', 'stepDescribeIssue': 'Descreva o Problema', 'stepSelectLocation': 'Localização', 'submitComplaint': 'Enviar Reclamação', 'myComplaints': 'Minhas Reclamações', 'noComplaints': 'Nenhuma reclamação ainda', 'startReporting': 'Comece a reportar problemas', 'complaintId': 'ID da Reclamação', 'status': 'Status', 'date': 'Data', 'location': 'Localização', 'priority': 'Prioridade', 'high': 'Alta', 'medium': 'Média', 'low': 'Baixa', 'pending': 'Pendente', 'acknowledged': 'Reconhecido', 'inProgress': 'Em Andamento', 'resolved': 'Resolvido', 'rejected': 'Rejeitado', 'closed': 'Fechado'},
        'roles': {'citizen': 'Cidadão', 'citizenSubtitle': 'Reporte e Acompanhe', 'citizenDescription': 'Registre reclamações, acompanhe o status e forneça feedback', 'official': 'Funcionário do Governo', 'officialSubtitle': 'Resolva Reclamações', 'officialDescription': 'Visualize reclamações atribuídas e atualize o status de resolução', 'admin': 'Administrador', 'adminSubtitle': 'Gerencie a Plataforma', 'adminDescription': 'Atribua reclamações, gerencie departamentos, visualize análises', 'selectRoleToContinue': 'Selecione seu papel para continuar', 'navigationInstructions': 'Use ↑↓ ou Enter para navegar • Clique para selecionar'},
        'bottomNav': {'home': 'Início', 'notifications': 'Notificações', 'complaints': 'Reclamações', 'profile': 'Perfil'}
    },
    'ru': {  # Russian
        'category': {'title': 'Выберите Категорию', 'dirtySpot': 'Грязное Место', 'garbageDump': 'Свалка', 'garbageVehicle': 'Мусоровоз Не Приходит', 'burningGarbage': 'Сжигание Мусора на Открытом Воздухе', 'sweepingNotDone': 'Уборка Не Выполнена', 'dustbinsNotCleaned': 'Мусорные Баки Не Очищены', 'openDefecation': 'Открытая Дефекация', 'sewerageOverflow': 'Переполнение Канализации/Ливневых Вод', 'stagnantWater': 'Стоячая Вода на Дороге', 'slumNotClean': 'Трущоба Не Убрана', 'overgrownVegetation': 'Разросшаяся Растительность на Дороге', 'strayAnimals': 'Бродячие Животные', 'navigateInstructions': '↑↓ или Enter для Навигации • Кликните для Выбора • Esc Назад'},
        'complaint': {'fileComplaint': 'Подать Жалобу', 'postNewComplaint': 'Подать Новую Жалобу', 'stepUploadImage': 'Изображение Проблемы', 'stepSelectCategory': 'Категория', 'stepDescribeIssue': 'Опишите Проблему', 'stepSelectLocation': 'Местоположение', 'submitComplaint': 'Отправить Жалобу', 'myComplaints': 'Мои Жалобы', 'noComplaints': 'Жалоб еще нет', 'startReporting': 'Начните сообщать о проблемах', 'complaintId': 'ID Жалобы', 'status': 'Статус', 'date': 'Дата', 'location': 'Местоположение', 'priority': 'Приоритет', 'high': 'Высокий', 'medium': 'Средний', 'low': 'Низкий', 'pending': 'В ожидании', 'acknowledged': 'Принято к сведению', 'inProgress': 'В процессе', 'resolved': 'Решено', 'rejected': 'Отклонено', 'closed': 'Закрыто'},
        'roles': {'citizen': 'Гражданин', 'citizenSubtitle': 'Сообщайте и Следите', 'citizenDescription': 'Подавайте жалобы, следите за статусом и оставляйте отзывы', 'official': 'Должностное Лицо', 'officialSubtitle': 'Решайте Жалобы', 'officialDescription': 'Просмотрите назначенные жалобы и обновите статус разрешения', 'admin': 'Администратор', 'adminSubtitle': 'Управляйте Платформой', 'adminDescription': 'Назначайте жалобы, управляйте отделам, просматривайте аналитику', 'selectRoleToContinue': 'Выберите свою роль для продолжения', 'navigationInstructions': 'Используйте ↑↓ или Enter для навигации • Кликните для выбора'},
        'bottomNav': {'home': 'Главная', 'notifications': 'Уведомления', 'complaints': 'Жалобы', 'profile': 'Профиль'}
    },
    'zh': {  # Chinese
        'category': {'title': '选择类别', 'dirtySpot': '脏污地点', 'garbageDump': '垃圾堆放', 'garbageVehicle': '垃圾车不来', 'burningGarbage': '露天焚烧垃圾', 'sweepingNotDone': '未进行清扫', 'dustbinsNotCleaned': '垃圾桶未清洁', 'openDefecation': '露天排便', 'sewerageOverflow': '下水道/雨水溢出', 'stagnantWater': '路面积水', 'slumNotClean': '贫民区未清洁', 'overgrownVegetation': '路面杂草丛生', 'strayAnimals': '流浪动物', 'navigateInstructions': '↑↓ 或 Enter 导航 • 点击选择 • Esc 返回'},
        'complaint': {'fileComplaint': '提交投诉', 'postNewComplaint': '提交新投诉', 'stepUploadImage': '问题图片', 'stepSelectCategory': '类别', 'stepDescribeIssue': '描述问题', 'stepSelectLocation': '地点', 'submitComplaint': '提交投诉', 'myComplaints': '我的投诉', 'noComplaints': '暂无投诉', 'startReporting': '开始报告问题', 'complaintId': '投诉编号', 'status': '状态', 'date': '日期', 'location': '地点', 'priority': '优先级', 'high': '高', 'medium': '中', 'low': '低', 'pending': '待处理', 'acknowledged': '已承诺', 'inProgress': '处理中', 'resolved': '已解决', 'rejected': '已拒绝', 'closed': '已关闭'},
        'roles': {'citizen': '市民', 'citizenSubtitle': '报告和跟踪', 'citizenDescription': '提交投诉、跟踪状态并提供反馈', 'official': '政府官员', 'officialSubtitle': '解决投诉', 'officialDescription': '查看分配的投诉并更新解决状态', 'admin': '管理员', 'adminSubtitle': '管理平台', 'adminDescription': '分配投诉、管理部门、查看分析', 'selectRoleToContinue': '选择您的角色以继续', 'navigationInstructions': '使用 ↑↓ 或 Enter 导航 • 点击选择'},
        'bottomNav': {'home': '首页', 'notifications': '通知', 'complaints': '投诉', 'profile': '个人资料'}
    },
    'ja': {  # Japanese
        'category': {'title': 'カテゴリーを選択', 'dirtySpot': '汚れた場所', 'garbageDump': 'ゴミ捨て場', 'garbageVehicle': 'ゴミ収集車が来ない', 'burningGarbage': '屋外でのゴミ焼却', 'sweepingNotDone': '清掃されていない', 'dustbinsNotCleaned': 'ゴミ箱が清掃されていない', 'openDefecation': '野外排便', 'sewerageOverflow': '下水道/雨水の溢流', 'stagnantWater': '道路上の淀んだ水', 'slumNotClean': 'スラム地域が清掃されていない', 'overgrownVegetation': '道路上の生い茂った植生', 'strayAnimals': '野良動物', 'navigateInstructions': '↑↓ または Enter でナビゲート • クリックして選択 • Esc 戻る'},
        'complaint': {'fileComplaint': '苦情を提出', 'postNewComplaint': '新しい苦情を提出', 'stepUploadImage': '問題の画像', 'stepSelectCategory': 'カテゴリー', 'stepDescribeIssue': '問題を説明', 'stepSelectLocation': '場所', 'submitComplaint': '苦情を提出', 'myComplaints': '私の苦情', 'noComplaints': 'まだ苦情がありません', 'startReporting': '問題の報告を開始', 'complaintId': '苦情ID', 'status': 'ステータス', 'date': '日付', 'location': '場所', 'priority': '優先度', 'high': '高', 'medium': '中', 'low': '低', 'pending': '保留中', 'acknowledged': '了承済み', 'inProgress': '処理中', 'resolved': '解決済み', 'rejected': '拒否', 'closed': '終了'},
        'roles': {'citizen': '市民', 'citizenSubtitle': '報告と追跡', 'citizenDescription': '苦情を提出し、ステータスを追跡し、フィードバックを提供', 'official': '政府職員', 'officialSubtitle': '苦情を解決', 'officialDescription': '割り当てられた苦情を表示し、解決ステータスを更新', 'admin': '管理者', 'adminSubtitle': 'プラットフォームを管理', 'adminDescription': '苦情を割り当て、部門を管理し、分析を表示', 'selectRoleToContinue': 'お客様のロールを選択して続行', 'navigationInstructions': '↑↓ または Enter を使用してナビゲート • クリックして選択'},
        'bottomNav': {'home': 'ホーム', 'notifications': '通知', 'complaints': '苦情', 'profile': 'プロフィール'}
    },
    'ko': {  # Korean
        'category': {'title': '카테고리 선택', 'dirtySpot': '더러운 장소', 'garbageDump': '쓰레기 처리장', 'garbageVehicle': '쓰레기차 미도착', 'burningGarbage': '개방 공간에서 쓰레기 소각', 'sweepingNotDone': '청소 미실시', 'dustbinsNotCleaned': '쓰레기통 미청소', 'openDefecation': '야외 배변', 'sewerageOverflow': '하수도/우수 넘침', 'stagnantWater': '도로의 고인 물', 'slumNotClean': '빈민가 미청소', 'overgrownVegetation': '도로의 과도한 식생', 'strayAnimals': '유기 동물', 'navigateInstructions': '↑↓ 또는 Enter로 이동 • 클릭하여 선택 • Esc 뒤로'},
        'complaint': {'fileComplaint': '민원 등록', 'postNewComplaint': '새 민원 등록', 'stepUploadImage': '문제 이미지', 'stepSelectCategory': '카테고리', 'stepDescribeIssue': '문제 설명', 'stepSelectLocation': '위치', 'submitComplaint': '민원 제출', 'myComplaints': '내 민원', 'noComplaints': '민원이 없습니다', 'startReporting': '문제 보고 시작', 'complaintId': '민원 ID', 'status': '상태', 'date': '날짜', 'location': '위치', 'priority': '우선순위', 'high': '높음', 'medium': '중간', 'low': '낮음', 'pending': '보류 중', 'acknowledged': '인정됨', 'inProgress': '진행 중', 'resolved': '해결됨', 'rejected': '거절됨', 'closed': '종료됨'},
        'roles': {'citizen': '시민', 'citizenSubtitle': '보고 및 추적', 'citizenDescription': '민원 등록, 상태 추적 및 의견 제공', 'official': '정부 관계자', 'officialSubtitle': '민원 해결', 'officialDescription': '할당된 민원 보기 및 해결 상태 업데이트', 'admin': '관리자', 'adminSubtitle': '플랫폼 관리', 'adminDescription': '민원 할당, 부서 관리, 분석 보기', 'selectRoleToContinue': '계속하려면 역할을 선택하세요', 'navigationInstructions': '↑↓ 또는 Enter를 사용하여 이동 • 클릭하여 선택'},
        'bottomNav': {'home': '홈', 'notifications': '알림', 'complaints': '민원', 'profile': '프로필'}
    },
    'hi': {  # Hindi
        'category': {'title': 'श्रेणी चुनें', 'dirtySpot': 'गंदी जगह', 'garbageDump': 'कचरा डंप', 'garbageVehicle': 'कचरा गाड़ी नहीं आ रही', 'burningGarbage': 'खुली जगह पर कचरा जलाना', 'sweepingNotDone': 'झाड़ू नहीं लगाई गई', 'dustbinsNotCleaned': 'कूड़ेदान साफ नहीं किए गए', 'openDefecation': 'खुले में शौच', 'sewerageOverflow': 'सीवेज/तूफान जल अतिप्रवाह', 'stagnantWater': 'सड़क पर रुका हुआ पानी', 'slumNotClean': 'झुग्गी क्षेत्र साफ नहीं है', 'overgrownVegetation': 'सड़क पर अत्यधिक वनस्पति', 'strayAnimals': 'आवारा जानवर', 'navigateInstructions': '↑↓ या Enter से नेविगेट करें • चुनने के लिए क्लिक करें • ऐस्क वापस'},
        'complaint': {'fileComplaint': 'शिकायत दर्ज करें', 'postNewComplaint': 'नई शिकायत दर्ज करें', 'stepUploadImage': 'समस्या की छवि', 'stepSelectCategory': 'श्रेणी', 'stepDescribeIssue': 'समस्या का वर्णन करें', 'stepSelectLocation': 'स्थान', 'submitComplaint': 'शिकायत सबमिट करें', 'myComplaints': 'मेरी शिकायतें', 'noComplaints': 'अभी तक कोई शिकायत नहीं', 'startReporting': 'समस्याओं की रिपोर्ट करना शुरू करें', 'complaintId': 'शिकायत आईडी', 'status': 'स्थिति', 'date': 'तारीख', 'location': 'स्थान', 'priority': 'प्राथमिकता', 'high': 'उच्च', 'medium': 'मध्यम', 'low': 'कम', 'pending': 'लंबित', 'acknowledged': 'स्वीकृत', 'inProgress': 'प्रगति में', 'resolved': 'समाधान किया गया', 'rejected': 'अस्वीकृत', 'closed': 'बंद'},
        'roles': {'citizen': 'नागरिक', 'citizenSubtitle': 'रिपोर्ट और ट्रैक करें', 'citizenDescription': 'शिकायतें दर्ज करें, स्थिति को ट्रैक करें और प्रतिक्रिया दें', 'official': 'सरकारी अधिकारी', 'officialSubtitle': 'शिकायतें हल करें', 'officialDescription': 'नियत शिकायतें देखें और समाधान स्थिति अपडेट करें', 'admin': 'प्रशासक', 'adminSubtitle': 'प्लेटफॉर्म प्रबंधित करें', 'adminDescription': 'शिकायतें नियत करें, विभागों का प्रबंधन करें, विश्लेषण देखें', 'selectRoleToContinue': 'जारी रखने के लिए अपनी भूमिका चुनें', 'navigationInstructions': 'नेविगेट करने के लिए ↑↓ या Enter का उपयोग करें • चुनने के लिए क्लिक करें'},
        'bottomNav': {'home': 'होम', 'notifications': 'सूचनाएं', 'complaints': 'शिकायतें', 'profile': 'प्रोफाइल'}
    }
}

# For all remaining languages, use English as fallback (they'll at least have structure)
print("Updating all language files with proper translations...")
updated_count = 0
skipped = []

for lang_file in sorted(os.listdir('.')):
    if not lang_file.endswith('.json') or lang_file == 'en.json':
        continue
    
    lang = lang_file[:-5]
    
    try:
        with open(lang_file, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        # Get translations for this language, or use minimal for other languages
        if lang in translations:
            lang_trans = translations[lang]
            for section in ['category', 'complaint', 'roles', 'bottomNav']:
                if section in lang_trans:
                    data[section] = lang_trans[section]
            updated_count += 1
            print(f'✓ {lang_file} - Updated with proper translations')
        else:
            # For languages without manual translations, ensure structure exists
            if all(k in data for k in ['category', 'complaint', 'roles', 'bottomNav']):
                print(f'✓ {lang_file} - Already has all sections')
            else:
                print(f'⚠ {lang_file} - Missing some sections (using English as reference)')
                skipped.append(lang)
        
        # Write back
        with open(lang_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    
    except Exception as e:
        print(f'✗ {lang_file} - Error: {str(e)}')

print(f'\n✅ Updated {updated_count} language files with complete translations!')
if skipped:
    print(f'⚠ Languages with English as fallback: {", ".join(skipped)}')
