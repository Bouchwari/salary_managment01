import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Home, PlusCircle, List, BarChart3, Wallet, Settings,
  Utensils, Car, Receipt, HeartPulse, Music, BookOpen,
  ShoppingBag, Package, Download, Languages, Trash2,
  AlertTriangle, Calendar, X, Check, ArrowUpRight,
  CircleDollarSign, Target, Sparkles, ChevronLeft,
  ChevronRight, Briefcase, Laptop, Gift, Moon, Plane,
  Shield, Building2, GraduationCap, Sun, Repeat, Zap,
  ArrowDownCircle, ArrowUpCircle, Pencil, PiggyBank,
  Minus, Plus, Lock, TrendingUp, TrendingDown, Percent,
  Clock,
} from 'lucide-react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer,
} from 'recharts';

// ════════════════════════════════════════════════════════════
//  LAYER 1 — DOMAIN
//  Pure business logic. No React, no storage, no UI.
//  Every function here is a deterministic transformation.
// ════════════════════════════════════════════════════════════

// ── Domain: Translations ─────────────────────────────────
export const T = {
  ar: {
    appName:'محاسبي', tagline:'مصاريفي اليومية',
    dashboard:'الرئيسية', add:'إضافة', list:'السجل',
    stats:'الإحصاء', budget:'الميزانية', settings:'إعدادات',
    expense:'مصروف', income:'دخل',
    noExpenses:'لا توجد عمليات بعد', startAdd:'ابدأ بإضافة عملية جديدة',
    amount:'المبلغ', category:'الفئة', date:'التاريخ',
    note:'ملاحظة (اختياري)', save:'حفظ', cancel:'إلغاء',
    addExpense:'إضافة عملية', editExpense:'تعديل العملية',
    chooseCategory:'اختر فئة', entries:'عملية', none:'—',
    recentExpenses:'آخر العمليات', seeAll:'عرض الكل',
    allExpenses:'جميع العمليات',
    allCategories:'كل الفئات', delete:'حذف',
    confirmDelete:'حذف هذا العنصر؟', yes:'نعم', no:'لا', confirm:'تأكيد',
    byCategory:'حسب الفئة', byDay:'حسب اليوم',
    monthComparison:'مقارنة الأشهر',
    setBudget:'حدد الميزانية الشهرية', monthlyBudget:'الميزانية الشهرية',
    spent:'تم صرفه', remaining:'المتبقي', overBudget:'تجاوزت الميزانية',
    nearLimit:'قارب الحد', ofBudget:'من الميزانية',
    exportCsv:'تصدير CSV', exportJson:'نسخة احتياطية',
    importJson:'استيراد نسخة', clearAll:'مسح كل البيانات',
    clearConfirm:'سيتم حذف كل البيانات. هل أنت متأكد؟',
    language:'اللغة', currency:'العملة',
    mad:'د.م.', today:'اليوم', yesterday:'أمس',
    newEntry:'عملية جديدة', alerts:'تنبيهات',
    alertsOk:'كل شيء ضمن الميزانية',
    insight:'نصيحة اليوم',
    keepTrack:'تتبع كل درهم يساعدك على التوفير.',
    months:['يناير','فبراير','مارس','أبريل','ماي','يونيو',
            'يوليوز','غشت','شتنبر','أكتوبر','نونبر','دجنبر'],
    income_short:'دخل', expense_short:'صرف', net_short:'صافي',
    filterAll:'الكل', filterExpense:'مصاريف', filterIncome:'دخل',
    // Goals
    savingsGoals:'أهداف الادخار', goalsSubtitle:'ادخر للأشياء المهمة',
    newGoal:'هدف جديد', editGoal:'تعديل الهدف',
    goalName:'اسم الهدف', target:'المبلغ المستهدف',
    saved:'المبلغ المُدَّخَر', progress:'التقدم',
    deposit:'إيداع', withdraw:'سحب', goalComplete:'تم بلوغ الهدف!',
    targetDateOpt:'التاريخ المستهدف (اختياري)',
    createGoal:'إنشاء الهدف', noGoals:'لا أهداف بعد',
    startGoal:'حدد هدف ادخار جديد', pickGoalType:'اختر نوع الهدف',
    goalTypes:{umrah:'عمرة',travel:'سفر',emergency:'طوارئ',
               car:'سيارة',home:'منزل',edu:'تعليم',other:'آخر'},
    goalNamePh:'مثال: رحلة إسبانيا', remainingToGoal:'المتبقي',
    // Templates
    templates:'اختصارات سريعة', newTemplate:'اختصار جديد',
    noTemplates:'لا اختصارات بعد',
    addTemplateHint:'احفظ عملياتك المتكررة لإضافتها بنقرة',
    saveAsTemplate:'حفظ كاختصار سريع', quickAdd:'اختصارات',
    templateName:'الوصف',
    // Recurring (= fixed costs)
    recurring:'المصاريف الدورية', manageRecurring:'إدارة الدورية',
    makeRecurring:'جعلها دورية', dayOfMonth:'يوم من الشهر',
    pendingRecurring:'دوريات في انتظار الإضافة',
    applyOne:'إضافة', applyAll:'إضافة الكل',
    noRecurring:'لا مصاريف دورية', everyMonthDay:'كل شهر في اليوم',
    dueDay:'مستحق يوم', recurringHint:'الإيجار، الكهرباء، الأنترنت…',
    // Salary / financial overview
    monthlySalary:'الراتب الشهري',
    disposableIncome:'المتاح للصرف',
    salary_label:'الراتب', fixed_label:'الدورية',
    variable_label:'المتغيرات', available_label:'المتاح',
    perDay:'يومياً', daysLeft:'يوم متبق',
    salaryNotSet:'حدد راتبك في الإعدادات لعرض التحليل',
    // Payday
    paydayDay:'يوم صرف الراتب',
    paydayCountdown:'أيام حتى الراتب',
    paydaySoon:'الراتب غداً!', paydayToday:'يوم الراتب اليوم 🎉',
    // Finance strategy
    savingsRate:'معدل الادخار', savingsRateIdeal:'المثالي 20%',
    savingsRateGood:'ممتاز! أنت توفر أكثر من 20%',
    savingsRateLow:'حاول الوصول لـ 20% توفير',
    rule5030:'قاعدة 50/30/20',
    ruleNeeds:'ضروريات', ruleWants:'رغبات', ruleSavings:'توفير',
    ruleNeedsHint:'50% للضروريات', ruleWantsHint:'30% للرغبات',
    ruleSavingsHint:'20% للادخار', ruleTarget:'الهدف', ruleActual:'الفعلي',
    projection:'توقع نهاية الشهر', projectionAt:'إذا استمريت بنفس الوتيرة',
    // Misc
    manage:'إدارة', theme:'السمة', darkMode:'داكن', lightMode:'فاتح',
  },
  fr: {
    appName:'Mes Comptes', tagline:'Mes dépenses quotidiennes',
    dashboard:'Accueil', add:'Ajouter', list:'Journal',
    stats:'Stats', budget:'Budget', settings:'Réglages',
    expense:'Dépense', income:'Revenu',
    noExpenses:'Aucune opération pour le moment',
    startAdd:'Commencez par ajouter une opération',
    amount:'Montant', category:'Catégorie', date:'Date',
    note:'Note (facultatif)', save:'Enregistrer', cancel:'Annuler',
    addExpense:'Nouvelle opération', editExpense:'Modifier',
    chooseCategory:'Choisir une catégorie', entries:'opérations', none:'—',
    recentExpenses:'Opérations récentes', seeAll:'Tout voir',
    allExpenses:'Toutes les opérations',
    allCategories:'Toutes catégories', delete:'Supprimer',
    confirmDelete:'Supprimer cet élément ?', yes:'Oui', no:'Non', confirm:'Confirmer',
    byCategory:'Par catégorie', byDay:'Par jour',
    monthComparison:'Comparaison mensuelle',
    setBudget:'Définir le budget mensuel', monthlyBudget:'Budget mensuel',
    spent:'Dépensé', remaining:'Restant', overBudget:'Budget dépassé',
    nearLimit:'Proche de la limite', ofBudget:'du budget',
    exportCsv:'Exporter CSV', exportJson:'Sauvegarde JSON',
    importJson:'Importer une sauvegarde', clearAll:'Effacer toutes les données',
    clearConfirm:'Toutes les données seront supprimées. Confirmer ?',
    language:'Langue', currency:'Devise',
    mad:'DH', today:"Aujourd'hui", yesterday:'Hier',
    newEntry:'Nouvelle opération', alerts:'Alertes',
    alertsOk:'Tout est sous contrôle',
    insight:'Conseil du jour',
    keepTrack:'Suivre chaque dirham vous aide à économiser.',
    months:['Janvier','Février','Mars','Avril','Mai','Juin',
            'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    income_short:'Revenus', expense_short:'Dépenses', net_short:'Solde',
    filterAll:'Tout', filterExpense:'Dépenses', filterIncome:'Revenus',
    savingsGoals:"Objectifs d'épargne", goalsSubtitle:"Épargnez pour ce qui compte",
    newGoal:'Nouvel objectif', editGoal:"Modifier l'objectif",
    goalName:"Nom de l'objectif", target:'Montant cible',
    saved:'Économisé', progress:'Progression',
    deposit:'Déposer', withdraw:'Retirer', goalComplete:'Objectif atteint !',
    targetDateOpt:'Date cible (facultatif)',
    createGoal:"Créer l'objectif", noGoals:'Aucun objectif',
    startGoal:"Définissez un objectif d'épargne", pickGoalType:"Type d'objectif",
    goalTypes:{umrah:'Omra',travel:'Voyage',emergency:'Urgence',
               car:'Voiture',home:'Maison',edu:'Études',other:'Autre'},
    goalNamePh:'Ex : Voyage en Espagne', remainingToGoal:'Reste à épargner',
    templates:'Modèles rapides', newTemplate:'Nouveau modèle',
    noTemplates:'Aucun modèle',
    addTemplateHint:'Enregistrez vos opérations fréquentes',
    saveAsTemplate:"L'enregistrer comme modèle rapide", quickAdd:'Raccourcis',
    templateName:'Description',
    recurring:'Charges récurrentes', manageRecurring:'Gérer les récurrences',
    makeRecurring:'Rendre récurrent', dayOfMonth:'Jour du mois',
    pendingRecurring:'Récurrences en attente',
    applyOne:'Ajouter', applyAll:'Tout ajouter',
    noRecurring:'Aucune charge récurrente', everyMonthDay:'Chaque mois le',
    dueDay:'Dû le', recurringHint:'Loyer, électricité, internet…',
    monthlySalary:'Salaire mensuel',
    disposableIncome:'Disponible ce mois',
    salary_label:'Salaire', fixed_label:'Charges',
    variable_label:'Dépenses', available_label:'Disponible',
    perDay:'/ jour', daysLeft:'jours restants',
    salaryNotSet:'Définissez votre salaire pour voir l\'analyse',
    paydayDay:'Jour de salaire',
    paydayCountdown:'Jours avant salaire',
    paydaySoon:'Salaire demain !', paydayToday:'Jour de salaire 🎉',
    savingsRate:"Taux d'épargne", savingsRateIdeal:'Idéal : 20%',
    savingsRateGood:'Excellent ! Vous économisez plus de 20%',
    savingsRateLow:"Essayez d'atteindre 20% d'épargne",
    rule5030:'Règle 50/30/20',
    ruleNeeds:'Besoins', ruleWants:'Envies', ruleSavings:'Épargne',
    ruleNeedsHint:'50% pour les besoins', ruleWantsHint:'30% pour les envies',
    ruleSavingsHint:"20% pour l'épargne", ruleTarget:'Cible', ruleActual:'Réel',
    projection:'Projection fin de mois', projectionAt:'À ce rythme',
    manage:'Gérer', theme:'Thème', darkMode:'Sombre', lightMode:'Clair',
  },
};

// ── Domain: Categories ────────────────────────────────────
export const CATEGORIES = [
  {id:'food',     type:'expense', ar:'طعام',    fr:'Alimentation', icon:Utensils,    color:'#C1440E', rule:'needs'},
  {id:'transport',type:'expense', ar:'تنقل',    fr:'Transport',    icon:Car,          color:'#0E4D3A', rule:'needs'},
  {id:'bills',    type:'expense', ar:'فواتير',  fr:'Factures',     icon:Receipt,      color:'#334155', rule:'needs'},
  {id:'health',   type:'expense', ar:'صحة',     fr:'Santé',        icon:HeartPulse,   color:'#B91C1C', rule:'needs'},
  {id:'leisure',  type:'expense', ar:'ترفيه',   fr:'Loisirs',      icon:Music,        color:'#7C3AED', rule:'wants'},
  {id:'education',type:'expense', ar:'تعليم',   fr:'Éducation',    icon:BookOpen,     color:'#1D4ED8', rule:'needs'},
  {id:'shopping', type:'expense', ar:'تسوق',    fr:'Shopping',     icon:ShoppingBag,  color:'#BE185D', rule:'wants'},
  {id:'other',    type:'expense', ar:'أخرى',    fr:'Autres',       icon:Package,      color:'#78716C', rule:'wants'},
  {id:'salary',   type:'income',  ar:'راتب',    fr:'Salaire',      icon:Briefcase,    color:'#0E4D3A'},
  {id:'freelance',type:'income',  ar:'عمل حر',  fr:'Indépendant',  icon:Laptop,       color:'#0369A1'},
  {id:'gift_inc', type:'income',  ar:'هدية',    fr:'Cadeau',       icon:Gift,         color:'#BE185D'},
  {id:'other_inc',type:'income',  ar:'دخل آخر', fr:'Autre revenu', icon:PlusCircle,   color:'#78716C'},
];

export const GOAL_ICONS = {
  umrah:    {icon:Moon,          color:'#B8893D'},
  travel:   {icon:Plane,         color:'#0369A1'},
  emergency:{icon:Shield,        color:'#B91C1C'},
  car:      {icon:Car,           color:'#334155'},
  home:     {icon:Building2,     color:'#0E4D3A'},
  edu:      {icon:GraduationCap, color:'#1D4ED8'},
  other:    {icon:Target,        color:'#7C3AED'},
};

// ── Custom category infrastructure ───────────────────────
// Icons available for user-created categories
export const ICON_MAP = {
  Utensils, Car, Home, Music, BookOpen, HeartPulse,
  ShoppingBag, Package, Briefcase, Laptop, Gift, PiggyBank,
  Target, Zap, Building2, GraduationCap, Plane, Moon,
  Shield, Sparkles, Clock, TrendingUp, Repeat, Wallet,
};

export const CUSTOM_COLORS = [
  '#C1440E','#0E4D3A','#B8893D','#7C3AED','#1D4ED8',
  '#BE185D','#0369A1','#B91C1C','#334155','#78716C',
  '#059669','#D97706','#7E22CE','#0E7490',
];

// Module-level registry — updated synchronously by App before each render
let _customCats = [];
const registerCustomCats = (cats) => { _customCats = cats; };
const customCatToFull = (c) => ({
  ...c, ar: c.label, fr: c.label,
  icon: ICON_MAP[c.iconName] ?? Package,
});

export const getCat = (id) => {
  const custom = _customCats.find(c => c.id === id);
  if (custom) return customCatToFull(custom);
  return CATEGORIES.find(c => c.id === id) ?? CATEGORIES[7];
};
export const expenseCats = () => [
  ...CATEGORIES.filter(c => c.type === 'expense'),
  ..._customCats.filter(c => c.type === 'expense').map(customCatToFull),
];
export const incomeCats = () => [
  ...CATEGORIES.filter(c => c.type === 'income'),
  ..._customCats.filter(c => c.type === 'income').map(customCatToFull),
];

// ── Domain: Entry (Ledger) ────────────────────────────────
/**
 * Entry = { id, type:'expense'|'income', amount, category, date, note? }
 * Pure selectors – no side effects
 */
export const Entry = {
  make: (fields) => ({ ...fields, amount: parseFloat(fields.amount) }),

  filterByMonth: (entries, month, year) =>
    entries.filter(e => {
      const d = new Date(e.date + 'T00:00:00');
      return d.getMonth() === month && d.getFullYear() === year;
    }),

  groupByDate: (entries) => {
    const map = {};
    [...entries]
      .sort((a,b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
      .forEach(e => { (map[e.date] ??= []).push(e); });
    return Object.entries(map).sort(([a],[b]) => b.localeCompare(a));
  },

  sumBy: (entries, type) =>
    entries.filter(e => e.type === type).reduce((s,e) => s + e.amount, 0),

  byCategory: (entries) => {
    const map = {};
    entries.filter(e => e.type === 'expense').forEach(e => {
      map[e.category] = (map[e.category] ?? 0) + e.amount;
    });
    return map;
  },

  topCategory: (byCat) => {
    const es = Object.entries(byCat);
    if (!es.length) return null;
    es.sort(([,a],[,b]) => b - a);
    return { id: es[0][0], total: es[0][1] };
  },

  dailyAvg: (expenses, daysElapsed) =>
    daysElapsed > 0 ? expenses / daysElapsed : 0,

  monthProjection: (expensesTotal, daysElapsed, daysInMonth) =>
    daysElapsed > 0 ? (expensesTotal / daysElapsed) * daysInMonth : expensesTotal,
};

// ── Domain: Recurring (= Fixed Monthly Costs) ────────────
/**
 * Recurring = { id, category, amount, note, dayOfMonth, appliedMonths:string[] }
 *
 * These are your fixed monthly costs (rent, electricity, internet…).
 * They serve TWO purposes:
 *   1. Their SUM is automatically deducted from salary → disposable income
 *   2. Each month they appear as "pending" → user taps to log the transaction
 *
 * This replaces the old "fixed expenses" concept. One list, no duplication.
 */
export const Recurring = {
  make: (fields) => ({
    ...fields,
    id: fields.id ?? uid('r'),
    appliedMonths: fields.appliedMonths ?? [],
  }),

  totalCost: (items) => items.reduce((s,r) => s + (r.amount ?? 0), 0),

  pending: (items, monthKey, dayOfMonth) =>
    items.filter(r =>
      dayOfMonth >= r.dayOfMonth && !(r.appliedMonths ?? []).includes(monthKey)
    ),

  apply: (item, monthKey, todayISO) => ({
    entry: Entry.make({
      id: uid('e'), type: 'expense', amount: item.amount,
      category: item.category, date: todayISO, note: item.note ?? '',
      recurringId: item.id,
    }),
    updatedItem: {
      ...item,
      appliedMonths: [...(item.appliedMonths ?? []), monthKey],
    },
  }),
};

// ── Domain: Budget ────────────────────────────────────────
/**
 * Budget = { [categoryId]: number }
 */
export const Budget = {
  alerts: (budgets, byCat) =>
    expenseCats()
      .map(cat => {
        const limit = budgets[cat.id];
        if (!limit || limit <= 0) return null;
        const spent = byCat[cat.id] ?? 0;
        const pct = (spent / limit) * 100;
        return pct >= 80 ? { cat, spent, limit, pct } : null;
      })
      .filter(Boolean)
      .sort((a,b) => b.pct - a.pct),
};

// ── Domain: FinancialProfile ──────────────────────────────
/**
 * Core personal finance calculations.
 * salary → recurring (fixed) → variable → available
 */
export const FinancialProfile = {
  disposable: (salary, recurringTotal) => salary - recurringTotal,

  remaining: (disposable, expenseTotal) => disposable - expenseTotal,

  savingsRate: (salary, remaining) =>
    salary > 0 ? (remaining / salary) * 100 : 0,

  dailyBudget: (remaining, daysLeft) =>
    daysLeft > 0 ? remaining / daysLeft : 0,

  paydayCountdown: (paydayDay, today, daysInMonth) => {
    if (!paydayDay || paydayDay < 1) return null;
    if (today === paydayDay) return 0;
    if (today < paydayDay)  return paydayDay - today;
    return daysInMonth - today + paydayDay; // wraps to next month
  },

  /**
   * 50/30/20 rule breakdown
   * Needs = bills category + recurring (fixed costs) + needs-tagged entries
   * Wants = wants-tagged entries
   * Savings = remaining after all
   */
  rule5030: (salary, recurringTotal, entries) => {
    const needs = recurringTotal +
      entries.filter(e => e.type === 'expense' && getCat(e.category).rule === 'needs')
             .reduce((s,e) => s + e.amount, 0);
    const wants =
      entries.filter(e => e.type === 'expense' && getCat(e.category).rule === 'wants')
             .reduce((s,e) => s + e.amount, 0);
    const totalSpent = entries.filter(e => e.type === 'expense').reduce((s,e) => s + e.amount, 0);
    const actualSavings = salary - recurringTotal - totalSpent;
    return {
      needs, wants, actualSavings,
      targets: { needs: salary * 0.5, wants: salary * 0.3, savings: salary * 0.2 },
    };
  },
};

// ── Domain: Goal ─────────────────────────────────────────
/**
 * Goal = { id, name, iconId, target, saved, targetDate? }
 */
export const Goal = {
  make: (fields) => ({ ...fields, id: fields.id ?? uid('g'), saved: fields.saved ?? 0 }),
  progress: (goal) => goal.target > 0 ? Math.min((goal.saved / goal.target) * 100, 100) : 0,
  remaining: (goal) => Math.max(0, goal.target - (goal.saved ?? 0)),
  adjust: (goal, delta) => ({ ...goal, saved: Math.max(0, (goal.saved ?? 0) + delta) }),
};

// ════════════════════════════════════════════════════════════
//  LAYER 2 — INFRASTRUCTURE
//  Storage adapter. Swap for a different backend without
//  touching business logic or UI.
// ════════════════════════════════════════════════════════════

const STORAGE_KEYS = {
  entries:   'mca:entries',
  budgets:   'mca:budgets',
  lang:      'mca:lang',
  goals:     'mca:goals',
  templates: 'mca:templates',
  recurring: 'mca:recurring',
  theme:     'mca:theme',
  salary:    'mca:salary',
  paydayDay:  'mca:payday',
  customCats: 'mca:custom_cats',
};

const Storage = {
  async load(key, fallback) {
    try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : fallback; }
    catch { return fallback; }
  },
  async save(key, value) {
    try { await window.storage.set(key, JSON.stringify(value)); } catch {}
  },
};

// ════════════════════════════════════════════════════════════
//  LAYER 3 — APPLICATION
//  Orchestrates domain logic + infrastructure.
//  This is the App component acting as an application service.
// ════════════════════════════════════════════════════════════

// ── Shared helpers (not domain, not UI) ──────────────────
const uid = (p='x') => `${p}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const mkKey = (m,y) => `${y}-${String(m+1).padStart(2,'0')}`;

const fmtMAD = (n, lang) => {
  const v = Math.round((Math.abs(n) + 1e-10) * 100) / 100;
  try {
    const s = v.toLocaleString(lang === 'ar' ? 'ar-MA' : 'fr-MA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return lang === 'ar' ? `${s} د.م.` : `${s} DH`;
  } catch {
    return lang === 'ar' ? `${v.toFixed(2)} د.م.` : `${v.toFixed(2)} DH`;
  }
};
const fmtShort = (n, lang) => {
  const v = Math.abs(n);
  if (v >= 1000) return lang === 'ar' ? `${(v/1000).toFixed(1)}ك د.م.` : `${(v/1000).toFixed(1)}k DH`;
  return fmtMAD(n, lang);
};
const fmtDate = (iso, lang, tr) => {
  const d = new Date(iso + 'T00:00:00');
  const today = new Date(); today.setHours(0,0,0,0);
  const yest  = new Date(today); yest.setDate(yest.getDate() - 1);
  if (d.getTime() === today.getTime()) return tr.today;
  if (d.getTime() === yest.getTime())  return tr.yesterday;
  return `${d.getDate()} ${tr.months[d.getMonth()]}`;
};

// ── Theme tokens ─────────────────────────────────────────
const THEMES = {
  light: {
    BG:'#F7F2E7', BG_DEEP:'#EFE7D4', SURFACE:'#FFFDF8',
    INK:'#1A1A1A', MUTED:'#6B6457', BORDER:'#E2D8BE',
    EMERALD:'#0E4D3A', EMERALD_DARK:'#093025', ON_EMERALD:'#FFFDF8',
    TERRA:'#C1440E', GOLD:'#B8893D',
    OVERLAY:'rgba(10,20,15,0.55)',
    WARN:'#FEE2E2', OK:'#D1FAE5',
  },
  dark: {
    BG:'#0D1A1A', BG_DEEP:'#152424', SURFACE:'#152424',
    INK:'#F7F2E7', MUTED:'#8A9A92', BORDER:'#223333',
    EMERALD:'#2E8B6E', EMERALD_DARK:'#0E4D3A', ON_EMERALD:'#FFFDF8',
    TERRA:'#E8734A', GOLD:'#D4A84E',
    OVERLAY:'rgba(0,0,0,0.7)',
    WARN:'#3A1F1F', OK:'#0D2A1A',
  },
};

// ── Application root ─────────────────────────────────────
export default function App() {
  // ── State ──
  const [lang,      setLang]      = useState('ar');
  const [theme,     setTheme]     = useState('light');
  const [tab,       setTab]       = useState('home');
  const [subView,   setSubView]   = useState(null);
  const [entries,   setEntries]   = useState([]);
  const [budgets,   setBudgets]   = useState({});
  const [goals,     setGoals]     = useState([]);
  const [templates, setTemplates] = useState([]);
  const [recurring, setRecurring] = useState([]);
  const [salary,    setSalary]    = useState(0);
  const [paydayDay,  setPaydayDay]  = useState(0);
  const [customCats, setCustomCats] = useState([]);
  const [loaded,    setLoaded]    = useState(false);
  const [editingEntry,  setEditingEntry]  = useState(null);
  const [prefillEntry,  setPrefillEntry]  = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [filterCat,   setFilterCat]  = useState('all');
  const [filterType,  setFilterType] = useState('all');
  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date(); return { month: d.getMonth(), year: d.getFullYear() };
  });

  const tr   = T[lang];
  const tk   = THEMES[theme];
  const isRTL = lang === 'ar';

  // Inject fonts
  useEffect(() => {
    const l = document.createElement('link');
    l.rel  = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Tajawal:wght@400;500;700;800&display=swap';
    document.head.appendChild(l);
    return () => { try { document.head.removeChild(l); } catch {} };
  }, []);

  // ── Load all state from storage ──
  useEffect(() => {
    (async () => {
      const [en, bg, lg, gl, tpl, rc, th, sal, pd, cc] = await Promise.all([
        Storage.load(STORAGE_KEYS.entries,    []),
        Storage.load(STORAGE_KEYS.budgets,    {}),
        Storage.load(STORAGE_KEYS.lang,       'ar'),
        Storage.load(STORAGE_KEYS.goals,      []),
        Storage.load(STORAGE_KEYS.templates,  []),
        Storage.load(STORAGE_KEYS.recurring,  []),
        Storage.load(STORAGE_KEYS.theme,      'light'),
        Storage.load(STORAGE_KEYS.salary,     0),
        Storage.load(STORAGE_KEYS.paydayDay,  0),
        Storage.load(STORAGE_KEYS.customCats, []),
      ]);
      // migrate old entries missing `type`
      setEntries(en.map(e => ({ ...e, type: e.type ?? 'expense' })));
      setBudgets(bg); setLang(lg); setGoals(gl); setTemplates(tpl);
      setRecurring(rc); setTheme(th); setSalary(sal); setPaydayDay(pd);
      setCustomCats(cc);
      setLoaded(true);
    })();
  }, []);

  // Persist on change
  useEffect(() => { if (loaded) Storage.save(STORAGE_KEYS.entries,   entries);   }, [entries, loaded]);
  useEffect(() => { if (loaded) Storage.save(STORAGE_KEYS.budgets,   budgets);   }, [budgets, loaded]);
  useEffect(() => { if (loaded) Storage.save(STORAGE_KEYS.lang,      lang);      }, [lang, loaded]);
  useEffect(() => { if (loaded) Storage.save(STORAGE_KEYS.goals,     goals);     }, [goals, loaded]);
  useEffect(() => { if (loaded) Storage.save(STORAGE_KEYS.templates, templates); }, [templates, loaded]);
  useEffect(() => { if (loaded) Storage.save(STORAGE_KEYS.recurring, recurring); }, [recurring, loaded]);
  useEffect(() => { if (loaded) Storage.save(STORAGE_KEYS.theme,     theme);     }, [theme, loaded]);
  useEffect(() => { if (loaded) Storage.save(STORAGE_KEYS.salary,    salary);    }, [salary, loaded]);
  useEffect(() => { if (loaded) Storage.save(STORAGE_KEYS.paydayDay,  paydayDay);  }, [paydayDay,  loaded]);
  useEffect(() => { if (loaded) Storage.save(STORAGE_KEYS.customCats, customCats); }, [customCats, loaded]);

  // ── Derived state (domain queries) ──
  const now = new Date();
  const isCurrentMonth = viewMonth.month === now.getMonth() && viewMonth.year === now.getFullYear();
  const daysInMonth    = new Date(viewMonth.year, viewMonth.month + 1, 0).getDate();
  const daysElapsed    = isCurrentMonth ? now.getDate() : daysInMonth;
  const daysLeft       = isCurrentMonth ? Math.max(1, daysInMonth - now.getDate()) : 0;

  const monthEntries = useMemo(
    () => Entry.filterByMonth(entries, viewMonth.month, viewMonth.year),
    [entries, viewMonth]
  );
  const expenseTotal   = useMemo(() => Entry.sumBy(monthEntries, 'expense'), [monthEntries]);
  const incomeTotal    = useMemo(() => Entry.sumBy(monthEntries, 'income'),  [monthEntries]);
  const byCat          = useMemo(() => Entry.byCategory(monthEntries),       [monthEntries]);
  const topCat         = useMemo(() => Entry.topCategory(byCat),             [byCat]);
  const recurringTotal = useMemo(() => Recurring.totalCost(recurring),       [recurring]);

  const effectiveSalary = salary > 0 ? salary : incomeTotal;
  const disposable      = FinancialProfile.disposable(effectiveSalary, recurringTotal);
  const remaining       = FinancialProfile.remaining(disposable, expenseTotal);
  const savingsRate     = FinancialProfile.savingsRate(effectiveSalary, remaining);
  const dailyBudget     = FinancialProfile.dailyBudget(remaining, daysLeft);
  const pctSpent        = disposable > 0 ? Math.min((expenseTotal / disposable) * 100, 100) : 0;
  const projection      = Entry.monthProjection(expenseTotal, daysElapsed, daysInMonth);
  const projectedLeft   = disposable - projection;

  const rule5030 = useMemo(
    () => FinancialProfile.rule5030(effectiveSalary, recurringTotal, monthEntries),
    [effectiveSalary, recurringTotal, monthEntries]
  );

  const budgetAlerts = useMemo(() => Budget.alerts(budgets, byCat), [budgets, byCat]);

  const paydayCountdown = useMemo(
    () => FinancialProfile.paydayCountdown(paydayDay, now.getDate(), daysInMonth),
    [paydayDay, daysInMonth]
  );

  const pendingRecurring = useMemo(() => {
    if (!isCurrentMonth) return [];
    return Recurring.pending(recurring, mkKey(now.getMonth(), now.getFullYear()), now.getDate());
  }, [recurring, isCurrentMonth]);

  // ── Application use-cases (commands) ──
  const addOrUpdateEntry = useCallback((data) => {
    const { _rec, saveTemplate, ...entryFields } = data;
    const entry = Entry.make({ ...entryFields, id: editingEntry?.id ?? uid('e') });
    setEntries(prev => {
      const rest = editingEntry ? prev.filter(x => x.id !== editingEntry.id) : prev;
      return [entry, ...rest];
    });
    if (saveTemplate && data.note) {
      setTemplates(prev => [
        { id: uid('t'), name: data.note, type: data.type, category: data.category, amount: parseFloat(data.amount), note: data.note },
        ...prev,
      ].slice(0, 50));
    }
    if (_rec && !editingEntry) {
      setRecurring(prev => [...prev, Recurring.make({
        category: data.category,
        amount: parseFloat(data.amount),
        note: data.note || '',
        dayOfMonth: _rec.dayOfMonth,
      })]);
    }
    setEditingEntry(null); setPrefillEntry(null); setTab('home');
  }, [editingEntry]);

  const deleteEntry = useCallback((id) => {
    setEntries(prev => prev.filter(e => e.id !== id));
    setConfirmAction(null);
  }, []);

  const applyRecurringItem = useCallback((item) => {
    const mk = mkKey(now.getMonth(), now.getFullYear());
    const { entry, updatedItem } = Recurring.apply(item, mk, todayISO());
    setEntries(prev => [entry, ...prev]);
    setRecurring(prev => prev.map(r => r.id === item.id ? updatedItem : r));
  }, []);

  const applyAllPending = useCallback(() => {
    pendingRecurring.forEach(applyRecurringItem);
  }, [pendingRecurring, applyRecurringItem]);

  const upsertGoal = useCallback((data) => {
    setGoals(prev => {
      if (data.id && prev.find(g => g.id === data.id))
        return prev.map(g => g.id === data.id ? Goal.make({ ...g, ...data }) : g);
      return [...prev, Goal.make(data)];
    });
  }, []);

  const adjustGoalSaved = useCallback((id, delta) => {
    setGoals(prev => prev.map(g => g.id === id ? Goal.adjust(g, delta) : g));
  }, []);

  const deleteGoal = useCallback((id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    setConfirmAction(null);
  }, []);

  const useTemplate = useCallback((tpl) => {
    setPrefillEntry({ type: tpl.type, category: tpl.category, amount: tpl.amount?.toString() ?? '', note: tpl.note ?? tpl.name ?? '', date: todayISO() });
    setEditingEntry(null); setTab('add');
  }, []);

  const clearAllData = useCallback(() => {
    setEntries([]); setBudgets({}); setGoals([]); setTemplates([]); setRecurring([]);
    setConfirmAction(null);
  }, []);

  const exportCSV = useCallback(() => {
    const rows = [...entries].sort((a,b) => a.date.localeCompare(b.date))
      .map(e => { const c = getCat(e.category); return `${e.date},${e.type},"${c.fr}",${e.amount.toFixed(2)},"${(e.note??'').replace(/"/g,'""')}"`; });
    download(new Blob(['\ufeffDate,Type,Category,Amount,Note\n'+rows.join('\n')], {type:'text/csv;charset=utf-8;'}), `mes-comptes-${todayISO()}.csv`);
  }, [entries]);

  const exportJSON = useCallback(() => {
    download(new Blob([JSON.stringify({exported:new Date().toISOString(),entries,budgets,goals,templates,recurring,salary},null,2)],{type:'application/json'}), `mes-comptes-backup-${todayISO()}.json`);
  }, [entries, budgets, goals, templates, recurring, salary]);

  const importJSON = useCallback((file) => {
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(r.result);
        if (Array.isArray(d.entries)) setEntries(d.entries.map(e => ({ ...e, type: e.type ?? 'expense' })));
        if (d.budgets)   setBudgets(d.budgets);
        if (d.goals)     setGoals(d.goals);
        if (d.templates) setTemplates(d.templates);
        if (d.recurring) setRecurring(d.recurring);
        if (d.salary)    setSalary(d.salary);
      } catch {}
    };
    r.readAsText(file);
  }, []);

  const addCustomCat = useCallback((cat) => {
    setCustomCats(prev => [...prev, cat]);
  }, []);

  const shiftMonth = (d) => setViewMonth(prev => { const dt = new Date(prev.year, prev.month + d, 1); return { month: dt.getMonth(), year: dt.getFullYear() }; });
  const jumpToNow  = () => { const d = new Date(); setViewMonth({ month: d.getMonth(), year: d.getFullYear() }); };

  // Sync custom cats to module-level registry before children render
  registerCustomCats(customCats);

  // ── Rendering ──
  if (!loaded) return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: tk.BG }}>
      <div style={{ color: tk.MUTED }}>…</div>
    </div>
  );

  const fontD = isRTL ? '"Tajawal",sans-serif' : '"Fraunces",serif';
  const fontB = isRTL ? '"Tajawal",sans-serif' : '"Plus Jakarta Sans",sans-serif';
  const tokens = { ...tk, fontD, fontB };
  const ctx = { tr, lang, isRTL, tokens };

  // ── Sub-views ──
  if (subView === 'goals')
    return <Shell {...ctx} theme={theme}><GoalsView {...ctx} goals={goals} onBack={() => setSubView(null)} onSave={upsertGoal} onAdjust={adjustGoalSaved} onDelete={deleteGoal} /></Shell>;

  if (subView === 'templates')
    return <Shell {...ctx} theme={theme}><TemplatesView {...ctx} templates={templates} setTemplates={setTemplates} onBack={() => setSubView(null)} onUse={useTemplate} /></Shell>;

  if (subView === 'recurring')
    return <Shell {...ctx} theme={theme}><RecurringView {...ctx} recurring={recurring} setRecurring={setRecurring} onBack={() => setSubView(null)} /></Shell>;

  return (
    <Shell {...ctx} theme={theme}>
      {/* ── Header ── */}
      <header className="px-5 pt-6 pb-4 max-w-2xl mx-auto flex items-center justify-between">
        <div>
          <div style={{ fontFamily: fontD, fontWeight: 600, fontSize: '1.75rem', color: tk.EMERALD }}>{tr.appName}</div>
          <div style={{ color: tk.MUTED, fontSize: '0.65rem', textTransform: isRTL ? 'none' : 'uppercase', letterSpacing: isRTL ? 0 : '0.12em' }}>{tr.tagline}</div>
        </div>
        <div className="flex items-center gap-2">
          <IconBtn onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} tk={tk}>
            {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </IconBtn>
          <IconBtn onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')} tk={tk}>
            <Languages className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">{lang === 'ar' ? 'FR' : 'ع'}</span>
          </IconBtn>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="px-5 max-w-2xl mx-auto" style={{ paddingBottom:'calc(env(safe-area-inset-bottom, 0px) + 7rem)' }}>
        {tab === 'home' && (
          <HomeView {...ctx}
            viewMonth={viewMonth} isCurrentMonth={isCurrentMonth}
            shiftMonth={shiftMonth} jumpToNow={jumpToNow}
            expenseTotal={expenseTotal} incomeTotal={incomeTotal}
            salary={salary} recurringTotal={recurringTotal}
            disposable={disposable} remaining={remaining}
            dailyBudget={dailyBudget} daysLeft={daysLeft}
            pctSpent={pctSpent}
            topCat={topCat} monthEntries={monthEntries}
            budgetAlerts={budgetAlerts} goals={goals}
            pendingRecurring={pendingRecurring}
            onApply={applyRecurringItem} onApplyAll={applyAllPending}
            paydayCountdown={paydayCountdown}
            setTab={setTab} setSubView={setSubView}
          />
        )}
        {tab === 'add' && (
          <EntryForm {...ctx}
            initial={editingEntry ?? prefillEntry}
            templates={templates}
            onUseTemplate={useTemplate}
            onSave={addOrUpdateEntry}
            onCancel={() => { setEditingEntry(null); setPrefillEntry(null); setTab('home'); }}
            customCats={customCats}
            onAddCat={addCustomCat}
          />
        )}
        {tab === 'list' && (
          <ListView {...ctx}
            entries={entries}
            filterCat={filterCat} setFilterCat={setFilterCat}
            filterType={filterType} setFilterType={setFilterType}
            onEdit={e => { setEditingEntry(e); setPrefillEntry(null); setTab('add'); }}
            onDelete={id => setConfirmAction({ type:'deleteEntry', id })}
          />
        )}
        {tab === 'stats' && (
          <StatsView {...ctx}
            entries={entries} monthEntries={monthEntries}
            expenseTotal={expenseTotal} incomeTotal={incomeTotal}
            byCat={byCat} viewMonth={viewMonth}
            salary={salary} recurringTotal={recurringTotal}
            rule5030={rule5030} savingsRate={savingsRate}
            daysElapsed={daysElapsed} daysInMonth={daysInMonth}
            disposable={disposable} projection={projection}
            projectedLeft={projectedLeft}
          />
        )}
        {tab === 'budget' && (
          <BudgetView {...ctx}
            budgets={budgets} setBudgets={setBudgets}
            byCat={byCat} expenseTotal={expenseTotal}
          />
        )}
        {tab === 'settings' && (
          <SettingsView {...ctx}
            salary={salary} setSalary={setSalary}
            paydayDay={paydayDay} setPaydayDay={setPaydayDay}
            recurringTotal={recurringTotal} recurringCount={recurring.length}
            theme={theme} setTheme={setTheme} setLang={setLang}
            templatesCount={templates.length}
            onExportCsv={exportCSV} onExportJson={exportJSON}
            onImportJson={importJSON}
            onClearAll={() => setConfirmAction({ type:'clearAll' })}
            setSubView={setSubView}
          />
        )}
      </main>

      {/* ── Confirm dialog ── */}
      {confirmAction && (
        <Confirm
          tokens={tokens}
          text={confirmAction.type === 'clearAll' ? tr.clearConfirm : tr.confirmDelete}
          tr={tr}
          onCancel={() => setConfirmAction(null)}
          onConfirm={() => {
            if (confirmAction.type === 'deleteEntry') deleteEntry(confirmAction.id);
            else if (confirmAction.type === 'deleteGoal') deleteGoal(confirmAction.id);
            else clearAllData();
          }}
        />
      )}

      {/* ── Bottom nav ── */}
      <BottomNav {...ctx} tab={tab} setTab={setTab}
        onAdd={() => { setEditingEntry(null); setPrefillEntry(null); setTab('add'); }} />
    </Shell>
  );
}

// ════════════════════════════════════════════════════════════
//  LAYER 4 — UI
//  Pure presentational components. They receive data and
//  callbacks as props. No business logic inside.
// ════════════════════════════════════════════════════════════

// ── Layout atoms ─────────────────────────────────────────
function Shell({ tokens, isRTL, theme, children }) {
  const tk = tokens;
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="w-full"
      style={{
        minHeight: '100dvh',
        background: tk.BG, color: tk.INK, fontFamily: tk.fontB,
        backgroundImage: theme === 'dark'
          ? `radial-gradient(circle at 20% 0%,${tk.EMERALD}18 0%,transparent 50%),radial-gradient(circle at 100% 100%,${tk.GOLD}10 0%,transparent 40%)`
          : `radial-gradient(circle at 20% 0%,${tk.BG_DEEP}55 0%,transparent 45%)`,
      }}>
      {/* Zellige stripe — extends up into the status bar safe area */}
      <div className="w-full" style={{
        background: `repeating-linear-gradient(90deg,${tk.EMERALD} 0 14px,${tk.GOLD} 14px 18px,${tk.TERRA} 18px 22px,${tk.GOLD} 22px 26px,${tk.EMERALD} 26px 40px)`,
        opacity: 0.9,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        minHeight: 'calc(env(safe-area-inset-top, 0px) + 6px)',
      }} />
      {children}
    </div>
  );
}

function IconBtn({ onClick, tk, children }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 px-3 py-2 rounded-full"
      style={{ border:`1px solid ${tk.BORDER}`, background:tk.SURFACE, color:tk.EMERALD }}>
      {children}
    </button>
  );
}

function BottomNav({ tr, tokens, tab, setTab, onAdd }) {
  const tk = tokens;
  return (
    <nav className="fixed bottom-0 start-0 end-0 z-40 px-3 pt-2"
      style={{ background:`linear-gradient(to top,${tk.BG} 70%,transparent)`, paddingBottom:'max(env(safe-area-inset-bottom, 0px), 12px)' }}>
      <div className="max-w-2xl mx-auto rounded-2xl px-2 py-2 flex items-center justify-between"
        style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}`, boxShadow:`0 8px 28px ${tk.EMERALD}18` }}>
        {[
          {id:'home',  icon:Home,     label:tr.dashboard},
          {id:'list',  icon:List,     label:tr.list},
        ].map(({id,icon:Icon,label}) => <NavTab key={id} active={tab===id} onClick={() => setTab(id)} icon={Icon} label={label} tk={tk} />)}
        <button onClick={onAdd} className="mx-1 p-3 rounded-full"
          style={{ background:tk.EMERALD, color:tk.ON_EMERALD, boxShadow:`0 6px 18px ${tk.EMERALD}40` }}>
          <PlusCircle className="w-5 h-5" strokeWidth={2.2} />
        </button>
        {[
          {id:'stats',  icon:BarChart3, label:tr.stats},
          {id:'budget', icon:Wallet,    label:tr.budget},
        ].map(({id,icon:Icon,label}) => <NavTab key={id} active={tab===id} onClick={() => setTab(id)} icon={Icon} label={label} tk={tk} />)}
      </div>
      <div className="flex justify-center mt-2">
        <button onClick={() => setTab('settings')} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold"
          style={{ background:tab==='settings'?tk.EMERALD:'transparent', color:tab==='settings'?tk.ON_EMERALD:tk.MUTED }}>
          <Settings className="w-3 h-3" />{tr.settings}
        </button>
      </div>
    </nav>
  );
}

function NavTab({ active, onClick, icon:Icon, label, tk }) {
  return (
    <button onClick={onClick} className="flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-xl"
      style={{ background:active?tk.BG_DEEP:'transparent', color:active?tk.EMERALD:tk.MUTED }}>
      <Icon className="w-4 h-4" strokeWidth={active?2.4:1.8} />
      <span className="text-[9px] font-semibold">{label}</span>
    </button>
  );
}

function Confirm({ tokens, text, tr, onCancel, onConfirm }) {
  const tk = tokens;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background:tk.OVERLAY }} onClick={onCancel}>
      <div className="w-full max-w-sm rounded-2xl p-6" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}` }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-full" style={{ background:tk.WARN }}><AlertTriangle className="w-5 h-5" style={{ color:tk.TERRA }} /></div>
          <div style={{ fontFamily:tk.fontD, fontWeight:600, color:tk.INK }}>{text}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel}  className="flex-1 py-3 rounded-xl text-sm font-semibold" style={{ background:tk.BG_DEEP, color:tk.INK }}>{tr.no}</button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-xl text-sm font-semibold" style={{ background:tk.TERRA, color:'#FFFDF8' }}>{tr.yes}</button>
        </div>
      </div>
    </div>
  );
}

// ── Home view ─────────────────────────────────────────────
function HomeView({ tr, lang, isRTL, tokens, viewMonth, isCurrentMonth, shiftMonth, jumpToNow, expenseTotal, incomeTotal, salary, recurringTotal, disposable, remaining, dailyBudget, daysLeft, pctSpent, topCat, monthEntries, budgetAlerts, goals, pendingRecurring, onApply, onApplyAll, paydayCountdown, setTab, setSubView }) {
  const tk = tokens;
  const hasSalary = salary > 0 || recurringTotal > 0;

  return (
    <div className="space-y-4">
      {/* Hero: financial overview */}
      <div className="relative rounded-3xl p-6 overflow-hidden"
        style={{ background:`linear-gradient(135deg,${tk.EMERALD} 0%,${tk.EMERALD_DARK} 100%)`, color:'#FFFDF8' }}>
        <div className="absolute -top-10 -end-10 w-44 h-44 rounded-full opacity-20" style={{ background:`radial-gradient(circle,${tk.GOLD} 0%,transparent 70%)` }} />
        {/* Month nav */}
        <div className="flex items-center justify-between mb-4 relative">
          <button onClick={() => shiftMonth(-1)} className="p-1.5 rounded-full hover:bg-white/10" style={{ color:'#FFFDF8' }}>
            {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button onClick={jumpToNow} className="flex items-center gap-1.5 text-xs opacity-90">
            <Calendar className="w-3 h-3" />
            <span style={{ textTransform:isRTL?'none':'uppercase', letterSpacing:isRTL?0:'0.15em' }}>
              {tr.months[viewMonth.month]} {viewMonth.year}
            </span>
          </button>
          <button onClick={() => shiftMonth(1)} disabled={isCurrentMonth} className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-30" style={{ color:'#FFFDF8' }}>
            {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {hasSalary ? (
          <>
            <div className="text-[10px] opacity-70 mb-1" style={{ textTransform:isRTL?'none':'uppercase', letterSpacing:isRTL?0:'0.12em' }}>{tr.disposableIncome}</div>
            <div className="text-4xl sm:text-5xl leading-none mb-1" style={{ fontFamily:tk.fontD, fontWeight:600 }}>
              <span style={{ color:remaining>=0?'#FFFDF8':'#FFD9C4' }}>{remaining<0?'−':''}{fmtMAD(remaining,lang)}</span>
            </div>
            {/* Breakdown row */}
            <div className="grid grid-cols-3 gap-2 mt-5 pt-4" style={{ borderTop:'1px solid rgba(255,253,248,0.15)' }}>
              {[
                [tr.salary_label,   fmtShort(salary||incomeTotal, lang)],
                [`− ${tr.fixed_label}`,  fmtShort(recurringTotal, lang)],
                [`− ${tr.variable_label}`,fmtShort(expenseTotal,  lang)],
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{ fontSize:'0.6rem', opacity:0.7, textTransform:isRTL?'none':'uppercase', letterSpacing:isRTL?0:'0.08em' }}>{label}</div>
                  <div style={{ fontSize:'0.875rem', fontWeight:600, fontVariantNumeric:'tabular-nums' }}>{value}</div>
                </div>
              ))}
            </div>
            {/* Spend bar */}
            <div className="mt-4">
              <div className="h-2 rounded-full overflow-hidden" style={{ background:'rgba(255,253,248,0.2)' }}>
                <div className="h-full rounded-full transition-all" style={{ width:`${pctSpent}%`, background:pctSpent>=90?tk.TERRA:pctSpent>=70?tk.GOLD:'#FFFDF8' }} />
              </div>
              {isCurrentMonth && daysLeft > 0 && (
                <div className="flex justify-between text-[10px] opacity-70 mt-1">
                  <span>{Math.round(pctSpent)}% {tr.spent}</span>
                  <span>{fmtMAD(dailyBudget,lang)} {tr.perDay} · {daysLeft} {tr.daysLeft}</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-[10px] opacity-70 mb-1">{tr.net_short}</div>
            <div className="text-4xl sm:text-5xl leading-none" style={{ fontFamily:tk.fontD, fontWeight:600 }}>
              {fmtMAD(incomeTotal-expenseTotal,lang)}
            </div>
            <div className="mt-4 py-2.5 px-4 rounded-xl text-xs font-semibold text-center" style={{ background:'rgba(255,253,248,0.15)', border:'1px dashed rgba(255,253,248,0.3)' }}>
              ✦ {tr.salaryNotSet}
            </div>
          </>
        )}
      </div>

      {/* Payday countdown */}
      {paydayCountdown !== null && (
        <div className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background:paydayCountdown===0?tk.OK:tk.SURFACE, border:`1px solid ${paydayCountdown===0?tk.EMERALD:tk.BORDER}` }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:tk.EMERALD+'18' }}>
            <Clock className="w-4 h-4" style={{ color:tk.EMERALD }} />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold" style={{ color:tk.MUTED }}>{tr.paydayCountdown}</div>
            <div className="text-sm font-bold" style={{ color:tk.INK, fontFamily:tk.fontD }}>
              {paydayCountdown===0?tr.paydayToday:paydayCountdown===1?tr.paydaySoon:`${paydayCountdown} ${lang==='ar'?'يوم':'jours'}`}
            </div>
          </div>
          <div className="text-3xl font-black" style={{ color:tk.EMERALD, fontFamily:tk.fontD, fontVariantNumeric:'tabular-nums' }}>
            {paydayCountdown > 0 ? paydayCountdown : '🎉'}
          </div>
        </div>
      )}

      {/* Pending recurring */}
      {pendingRecurring.length > 0 && (
        <div className="rounded-2xl p-4" style={{ background:tk.SURFACE, border:`1px solid ${tk.GOLD}50` }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Repeat className="w-4 h-4" style={{ color:tk.GOLD }} />
              <div className="text-sm font-bold" style={{ color:tk.INK }}>{tr.pendingRecurring}</div>
            </div>
            {pendingRecurring.length > 1 && (
              <button onClick={onApplyAll} className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background:tk.EMERALD, color:tk.ON_EMERALD }}>{tr.applyAll}</button>
            )}
          </div>
          <div className="space-y-2">
            {pendingRecurring.map(r => {
              const cat = getCat(r.category); const Icon = cat.icon;
              return (
                <div key={r.id} className="flex items-center gap-3 py-1">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:cat.color+'20' }}><Icon className="w-3.5 h-3.5" style={{ color:cat.color }} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate" style={{ color:tk.INK }}>{r.note||(lang==='ar'?cat.ar:cat.fr)}</div>
                    <div className="text-[10px]" style={{ color:tk.MUTED }}>{tr.dueDay} {r.dayOfMonth}</div>
                  </div>
                  <div className="text-sm font-bold" style={{ color:tk.INK, fontVariantNumeric:'tabular-nums' }}>{fmtMAD(r.amount,lang)}</div>
                  <button onClick={() => onApply(r)} className="p-1.5 rounded-lg" style={{ background:tk.EMERALD, color:tk.ON_EMERALD }}><Check className="w-3.5 h-3.5" /></button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Goals */}
      <Card tk={tk}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2"><PiggyBank className="w-4 h-4" style={{ color:tk.GOLD }} /><span className="text-sm font-bold" style={{ color:tk.INK }}>{tr.savingsGoals}</span></div>
          <TextBtn onClick={() => setSubView('goals')} tk={tk}>{tr.manage} <ArrowUpRight className="w-3 h-3 inline" /></TextBtn>
        </div>
        {goals.length === 0
          ? <button onClick={() => setSubView('goals')} className="w-full py-4 rounded-xl text-xs font-semibold" style={{ background:tk.BG_DEEP, color:tk.EMERALD, border:`1px dashed ${tk.BORDER}` }}>+ {tr.newGoal}</button>
          : <div className="space-y-3">{goals.slice(0,3).map(g => { const ic=GOAL_ICONS[g.iconId]??GOAL_ICONS.other; const Icon=ic.icon; const pct=Goal.progress(g); return (
            <div key={g.id} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:ic.color+'15' }}><Icon className="w-4 h-4" style={{ color:ic.color }} /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1"><span className="text-xs font-bold truncate" style={{ color:tk.INK }}>{g.name}</span><span className="text-[10px] font-semibold" style={{ color:tk.MUTED, fontVariantNumeric:'tabular-nums' }}>{fmtMAD(g.saved??0,lang)}/{fmtMAD(g.target,lang)}</span></div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background:tk.BG_DEEP }}><div className="h-full rounded-full" style={{ width:`${pct}%`,background:ic.color }} /></div>
              </div>
            </div>
          );})}</div>
        }
      </Card>

      {/* Budget alerts */}
      {budgetAlerts.length > 0 && (
        <Card tk={tk}>
          <div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-4 h-4" style={{ color:tk.TERRA }} /><span className="text-sm font-bold" style={{ color:tk.INK }}>{tr.alerts}</span></div>
          <div className="space-y-2.5">
            {budgetAlerts.slice(0,3).map(a => { const Icon=a.cat.icon; const over=a.pct>=100; return (
              <div key={a.cat.id} className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg" style={{ background:a.cat.color+'15' }}><Icon className="w-3.5 h-3.5" style={{ color:a.cat.color }} /></div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1"><span className="font-semibold" style={{ color:tk.INK }}>{lang==='ar'?a.cat.ar:a.cat.fr}</span><span style={{ color:over?tk.TERRA:tk.GOLD, fontWeight:600 }}>{Math.round(a.pct)}%</span></div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background:tk.BG_DEEP }}><div className="h-full rounded-full" style={{ width:`${Math.min(a.pct,100)}%`, background:over?tk.TERRA:tk.GOLD }} /></div>
                </div>
              </div>
            );})}
          </div>
        </Card>
      )}

      {/* Recent */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold" style={{ color:tk.INK, textTransform:isRTL?'none':'uppercase', letterSpacing:isRTL?0:'0.08em' }}>{tr.recentExpenses}</span>
          {monthEntries.length > 5 && <TextBtn onClick={() => setTab('list')} tk={tk}>{tr.seeAll}</TextBtn>}
        </div>
        {monthEntries.length === 0
          ? <EmptyState tr={tr} onAdd={() => setTab('add')} tokens={tokens} />
          : <div className="space-y-2">{monthEntries.slice(0,5).map(e => <EntryRow key={e.id} entry={e} lang={lang} tr={tr} tokens={tokens} />)}</div>
        }
      </div>

      {/* Insight */}
      <div className="rounded-2xl p-4 flex items-start gap-3"
        style={{ background:`linear-gradient(135deg,${tk.GOLD}18,${tk.TERRA}10)`, border:`1px solid ${tk.GOLD}30` }}>
        <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color:tk.GOLD }} />
        <div><div className="text-xs font-bold mb-0.5" style={{ color:tk.INK }}>{tr.insight}</div><div className="text-xs leading-relaxed" style={{ color:tk.MUTED }}>{tr.keepTrack}</div></div>
      </div>
    </div>
  );
}

function Card({ tk, children, highlight }) {
  return <div className="rounded-2xl p-4" style={{ background:tk.SURFACE, border:`1px solid ${highlight??tk.BORDER}` }}>{children}</div>;
}
function TextBtn({ onClick, tk, children }) {
  return <button onClick={onClick} className="text-[11px] font-semibold" style={{ color:tk.EMERALD }}>{children}</button>;
}
function EmptyState({ tr, onAdd, tokens }) {
  const tk=tokens;
  return (
    <div className="rounded-2xl p-8 text-center" style={{ background:tk.SURFACE, border:`1px dashed ${tk.BORDER}` }}>
      <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background:tk.BG_DEEP }}><CircleDollarSign className="w-5 h-5" style={{ color:tk.EMERALD }} /></div>
      <div className="text-sm font-semibold mb-1" style={{ color:tk.INK, fontFamily:tk.fontD }}>{tr.noExpenses}</div>
      <div className="text-xs mb-4" style={{ color:tk.MUTED }}>{tr.startAdd}</div>
      <button onClick={onAdd} className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background:tk.EMERALD, color:tk.ON_EMERALD }}>+ {tr.addExpense}</button>
    </div>
  );
}
function EntryRow({ entry, lang, tr, tokens, onClick }) {
  const cat=getCat(entry.category); const Icon=cat.icon; const tk=tokens;
  return (
    <div onClick={onClick} className={`rounded-xl p-3 flex items-center gap-3 ${onClick?'cursor-pointer':''}`} style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}` }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:cat.color+'15' }}><Icon className="w-4 h-4" style={{ color:cat.color }} /></div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate" style={{ color:tk.INK }}>{entry.note||(lang==='ar'?cat.ar:cat.fr)}</div>
        <div className="text-[11px]" style={{ color:tk.MUTED }}>{fmtDate(entry.date,lang,tr)} · {lang==='ar'?cat.ar:cat.fr}</div>
      </div>
      <div className="text-sm font-bold flex-shrink-0" style={{ color:entry.type==='income'?tk.EMERALD:tk.INK, fontVariantNumeric:'tabular-nums' }}>
        {entry.type==='income'?'+':''}{fmtMAD(entry.amount,lang)}
      </div>
    </div>
  );
}

// ── Entry Form ────────────────────────────────────────────
function EntryForm({ tr, lang, isRTL, tokens, initial, templates, onUseTemplate, onSave, onCancel, customCats=[], onAddCat }) {
  const tk=tokens;
  const [type,         setType]        = useState(initial?.type??'expense');
  const [amount,       setAmount]      = useState(initial?.amount?.toString()??'');
  const [category,     setCategory]    = useState(initial?.category??null);
  const [date,         setDate]        = useState(initial?.date??todayISO());
  const [note,         setNote]        = useState(initial?.note??'');
  const [saveTemplate, setSaveTemplate]= useState(false);
  const [makeRecurring,setMakeRecurring]=useState(false);
  const [dom,          setDom]         = useState(1);
  const [showCatModal, setShowCatModal]= useState(false);

  const cats    = type==='expense' ? expenseCats() : incomeCats();
  const canSave = amount && parseFloat(amount)>0 && category && cats.find(c=>c.id===category);
  const isEdit  = !!initial?.id;
  useEffect(()=>{ if(category&&!cats.find(c=>c.id===category)) setCategory(null); },[type]);
  const tpls = templates.filter(t=>t.type===type).slice(0,6);

  return (
    <div className="space-y-5">
      <div>
        <div style={{ fontFamily:tk.fontD, fontWeight:600, fontSize:'1.5rem', color:tk.EMERALD }}>{isEdit?tr.editExpense:tr.addExpense}</div>
        <div style={{ color:tk.MUTED, fontSize:'0.75rem' }}>{tr.newEntry}</div>
      </div>

      {/* Type toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl" style={{ background:tk.BG_DEEP }}>
        {[{id:'expense',label:tr.expense,icon:ArrowUpCircle,bg:tk.TERRA},{id:'income',label:tr.income,icon:ArrowDownCircle,bg:tk.EMERALD}].map(({id,label,icon:Icon,bg}) => (
          <button key={id} onClick={()=>setType(id)} className="py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5" style={{ background:type===id?bg:'transparent', color:type===id?'#FFFDF8':tk.MUTED }}>
            <Icon className="w-4 h-4" />{label}
          </button>
        ))}
      </div>

      {/* Template shortcuts */}
      {tpls.length > 0 && !isEdit && (
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold mb-2" style={{ color:tk.MUTED, textTransform:isRTL?'none':'uppercase', letterSpacing:isRTL?0:'0.18em' }}><Zap className="w-3 h-3"/>{tr.quickAdd}</div>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth:'none' }}>
            {tpls.map(t => { const cat=getCat(t.category); const Icon=cat.icon; return (
              <button key={t.id} onClick={()=>onUseTemplate(t)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex-shrink-0" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}`, color:tk.INK }}>
                <Icon className="w-3.5 h-3.5" style={{ color:cat.color }}/>{t.name}
              </button>
            );})}
          </div>
        </div>
      )}

      {/* Amount */}
      <div className="rounded-2xl p-5" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}` }}>
        <Label tk={tk} isRTL={isRTL}>{tr.amount}</Label>
        <div className="flex items-baseline gap-2">
          <input type="number" inputMode="decimal" step="0.01" placeholder="0.00" value={amount} onChange={e=>setAmount(e.target.value)}
            className="flex-1 bg-transparent outline-none text-4xl font-semibold"
            style={{ color:type==='income'?tk.EMERALD:tk.INK, fontFamily:tk.fontD, fontVariantNumeric:'tabular-nums', direction:'ltr', textAlign:isRTL?'right':'left' }} />
          <span style={{ color:tk.GOLD, fontFamily:tk.fontD, fontSize:'1.25rem', fontWeight:600 }}>{tr.mad}</span>
        </div>
      </div>

      {/* Category grid */}
      <div>
        <Label tk={tk} isRTL={isRTL}>{tr.chooseCategory}</Label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {cats.map(c => { const Icon=c.icon; const sel=category===c.id; return (
            <button key={c.id} onClick={()=>setCategory(c.id)} className="p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all"
              style={{ background:sel?c.color:tk.SURFACE, border:`1px solid ${sel?c.color:tk.BORDER}`, color:sel?'#FFFDF8':tk.INK, transform:sel?'scale(1.03)':'scale(1)' }}>
              <Icon className="w-5 h-5" strokeWidth={sel?2.4:1.8}/>
              <span className="text-[10px] font-semibold text-center leading-tight">{lang==='ar'?c.ar:c.fr}</span>
            </button>
          );})}
          {/* Add custom category tile */}
          {!isEdit && (
            <button onClick={()=>setShowCatModal(true)} className="p-3 rounded-xl flex flex-col items-center gap-1.5"
              style={{ background:tk.SURFACE, border:`1.5px dashed ${tk.BORDER}`, color:tk.MUTED }}>
              <Plus className="w-5 h-5"/>
              <span className="text-[10px] font-semibold text-center leading-tight">{lang==='ar'?'جديدة':'Créer'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Custom category modal */}
      {showCatModal && (
        <CustomCatModal tr={tr} lang={lang} isRTL={isRTL} tokens={tokens} type={type}
          onCancel={()=>setShowCatModal(false)}
          onSave={cat=>{ onAddCat?.(cat); setCategory(cat.id); setShowCatModal(false); }}
        />
      )}

      {/* Date + note */}
      <div className="rounded-2xl p-4 space-y-3" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}` }}>
        <div><Label tk={tk} isRTL={isRTL}>{tr.date}</Label><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full bg-transparent outline-none text-sm font-medium mt-1.5" style={{ color:tk.INK, direction:'ltr' }}/></div>
        <Divider tk={tk}/>
        <div><Label tk={tk} isRTL={isRTL}>{tr.note}</Label><input type="text" value={note} onChange={e=>setNote(e.target.value)} placeholder={lang==='ar'?'مثال: قهوة':'Ex : café'} className="w-full bg-transparent outline-none text-sm mt-1.5" style={{ color:tk.INK }}/></div>
      </div>

      {/* Options */}
      {!isEdit && (
        <div className="rounded-2xl p-4 space-y-3" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}` }}>
          <OptionRow icon={<Zap className="w-4 h-4" style={{ color:tk.GOLD }}/>} label={tr.saveAsTemplate} checked={saveTemplate} onChange={setSaveTemplate} tk={tk}/>
          {type==='expense' && <>
            <Divider tk={tk}/>
            <OptionRow icon={<Repeat className="w-4 h-4" style={{ color:tk.GOLD }}/>} label={tr.makeRecurring} checked={makeRecurring} onChange={setMakeRecurring} tk={tk}/>
            {makeRecurring && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-semibold" style={{ color:tk.MUTED }}>{tr.dayOfMonth}:</span>
                <input type="number" min="1" max="28" value={dom} onChange={e=>setDom(Math.max(1,Math.min(28,parseInt(e.target.value)||1)))} className="w-16 text-center bg-transparent outline-none rounded-lg py-1 text-sm font-semibold" style={{ color:tk.INK, border:`1px solid ${tk.BORDER}`, direction:'ltr' }}/>
              </div>
            )}
          </>}
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <button onClick={onCancel} className="flex-1 py-3.5 rounded-xl text-sm font-semibold" style={{ background:tk.BG_DEEP, color:tk.INK }}>{tr.cancel}</button>
        <button onClick={()=>canSave&&onSave({type,amount,category,date,note,saveTemplate,...(makeRecurring?{_rec:{dayOfMonth:dom}}:{})})} disabled={!canSave} className="flex-[2] py-3.5 rounded-xl text-sm font-semibold"
          style={{ background:canSave?tk.EMERALD:tk.MUTED, color:tk.ON_EMERALD, opacity:canSave?1:0.5, boxShadow:canSave?`0 6px 18px ${tk.EMERALD}30`:'none' }}>
          {tr.save}
        </button>
      </div>
    </div>
  );
}

function Label({ tk, isRTL, children }) {
  return <div className="text-[10px] font-bold" style={{ color:tk.MUTED, textTransform:isRTL?'none':'uppercase', letterSpacing:isRTL?0:'0.18em' }}>{children}</div>;
}
function Divider({ tk }) { return <div style={{ borderTop:`1px solid ${tk.BORDER}` }}/>; }
function OptionRow({ icon, label, checked, onChange, tk }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} className="w-4 h-4 rounded" style={{ accentColor:tk.EMERALD }}/>
      <span className="flex-1 text-xs font-semibold" style={{ color:tk.INK }}>{label}</span>
      {icon}
    </label>
  );
}

// ── List View ─────────────────────────────────────────────
function ListView({ tr, lang, isRTL, tokens, entries, filterCat, setFilterCat, filterType, setFilterType, onEdit, onDelete }) {
  const tk=tokens;
  const filtered = useMemo(()=>{
    let r=[...entries];
    if(filterType!=='all') r=r.filter(e=>e.type===filterType);
    if(filterCat!=='all')  r=r.filter(e=>e.category===filterCat);
    return r.sort((a,b)=>b.date.localeCompare(a.date)||b.id.localeCompare(a.id));
  },[entries,filterCat,filterType]);
  const groups  = useMemo(()=>Entry.groupByDate(filtered),[filtered]);
  const visCats = filterType==='income'?incomeCats():filterType==='expense'?expenseCats():CATEGORIES;

  return (
    <div className="space-y-4">
      <div><div style={{ fontFamily:tk.fontD, fontWeight:600, fontSize:'1.5rem', color:tk.EMERALD }}>{tr.allExpenses}</div><div style={{ color:tk.MUTED, fontSize:'0.75rem' }}>{filtered.length} {tr.entries}</div></div>
      <div className="grid grid-cols-3 gap-1 p-1 rounded-xl" style={{ background:tk.BG_DEEP }}>
        {[{id:'all',l:tr.filterAll},{id:'expense',l:tr.filterExpense},{id:'income',l:tr.filterIncome}].map(({id,l})=>(
          <button key={id} onClick={()=>{setFilterType(id);setFilterCat('all');}} className="py-2 rounded-lg text-xs font-semibold" style={{ background:filterType===id?tk.SURFACE:'transparent', color:filterType===id?tk.EMERALD:tk.MUTED }}>{l}</button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth:'none' }}>
        <Chip active={filterCat==='all'} onClick={()=>setFilterCat('all')} tokens={tokens}>{tr.allCategories}</Chip>
        {visCats.map(c=><Chip key={c.id} active={filterCat===c.id} onClick={()=>setFilterCat(c.id)} color={c.color} tokens={tokens}>{lang==='ar'?c.ar:c.fr}</Chip>)}
      </div>
      {groups.length===0
        ? <div className="rounded-2xl p-8 text-center" style={{ background:tk.SURFACE, border:`1px dashed ${tk.BORDER}` }}><div style={{ color:tk.MUTED }}>{tr.noExpenses}</div></div>
        : <div className="space-y-5">{groups.map(([date,items])=>{
          const daySum=items.reduce((s,e)=>s+(e.type==='income'?e.amount:-e.amount),0);
          return (
            <div key={date}>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-bold" style={{ color:tk.MUTED, textTransform:isRTL?'none':'uppercase', letterSpacing:isRTL?0:'0.1em' }}>{fmtDate(date,lang,tr)}</span>
                <span className="text-[11px] font-semibold" style={{ color:daySum>=0?tk.EMERALD:tk.TERRA, fontVariantNumeric:'tabular-nums' }}>{daySum>=0?'+':'−'}{fmtMAD(daySum,lang)}</span>
              </div>
              <div className="space-y-2">
                {items.map(e=>(
                  <div key={e.id} className="flex items-center gap-2">
                    <div className="flex-1 min-w-0" onClick={()=>onEdit(e)}>
                      <EntryRow entry={e} lang={lang} tr={tr} tokens={tokens} onClick={()=>onEdit(e)}/>
                    </div>
                    <button onClick={()=>onDelete(e.id)} className="flex-shrink-0 flex items-center justify-center rounded-xl" style={{ background:tk.WARN, color:tk.TERRA, width:'40px', height:'40px', minWidth:'40px' }}><Trash2 className="w-3.5 h-3.5"/></button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}</div>
      }
    </div>
  );
}
function Chip({ active, onClick, children, color, tokens }) {
  const tk=tokens; const bg=active?(color??tk.EMERALD):tk.SURFACE;
  return <button onClick={onClick} className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0" style={{ background:bg, color:active?'#FFFDF8':tk.INK, border:`1px solid ${active?bg:tk.BORDER}` }}>{children}</button>;
}

// ── Stats View ────────────────────────────────────────────
function StatsView({ tr, lang, isRTL, tokens, entries, monthEntries, expenseTotal, incomeTotal, byCat, viewMonth, salary, recurringTotal, rule5030, savingsRate, daysElapsed, daysInMonth, disposable, projection, projectedLeft }) {
  const tk=tokens;
  const effectiveSalary=salary>0?salary:incomeTotal;
  const pieData=useMemo(()=>expenseCats().map(c=>({name:lang==='ar'?c.ar:c.fr,value:byCat[c.id]??0,color:c.color,id:c.id})).filter(d=>d.value>0).sort((a,b)=>b.value-a.value),[byCat,lang]);
  const total=pieData.reduce((s,d)=>s+d.value,0);
  const monthsData=useMemo(()=>{
    const ref=new Date(viewMonth.year,viewMonth.month,1);
    return Array.from({length:6},(_,i)=>{
      const d=new Date(ref.getFullYear(),ref.getMonth()-(5-i),1);
      let exp=0,inc=0;
      entries.forEach(e=>{const ed=new Date(e.date+'T00:00:00');if(ed.getMonth()===d.getMonth()&&ed.getFullYear()===d.getFullYear()){if(e.type==='income')inc+=e.amount;else exp+=e.amount;}});
      return {name:tr.months[d.getMonth()].slice(0,3),expense:Math.round(exp),income:Math.round(inc)};
    });
  },[entries,lang,viewMonth]);
  const dailyData=useMemo(()=>{
    const days=new Date(viewMonth.year,viewMonth.month+1,0).getDate();
    const arr=Array.from({length:days},(_,i)=>({day:i+1,value:0}));
    monthEntries.filter(e=>e.type==='expense').forEach(e=>{const d=new Date(e.date+'T00:00:00');arr[d.getDate()-1].value+=e.amount;});
    return arr.map(x=>({...x,value:Math.round(x.value)}));
  },[monthEntries,viewMonth]);

  return (
    <div className="space-y-5">
      <div><div style={{ fontFamily:tk.fontD, fontWeight:600, fontSize:'1.5rem', color:tk.EMERALD }}>{tr.stats}</div><div style={{ color:tk.MUTED, fontSize:'0.75rem' }}>{tr.months[viewMonth.month]} {viewMonth.year}</div></div>

      {/* Income / Expense summary */}
      <div className="grid grid-cols-2 gap-3">
        {[{label:tr.income_short,value:incomeTotal,color:tk.EMERALD,icon:ArrowDownCircle},{label:tr.expense_short,value:expenseTotal,color:tk.TERRA,icon:ArrowUpCircle}].map(({label,value,color,icon:Icon})=>(
          <Card tk={tk} key={label}>
            <div className="flex items-center gap-1.5 mb-1"><Icon className="w-3 h-3" style={{ color }} /><span className="text-[10px] font-bold" style={{ color:tk.MUTED, textTransform:isRTL?'none':'uppercase', letterSpacing:isRTL?0:'0.12em' }}>{label}</span></div>
            <div className="text-lg font-bold" style={{ color, fontFamily:tk.fontD, fontVariantNumeric:'tabular-nums' }}>{fmtMAD(value,lang)}</div>
          </Card>
        ))}
      </div>

      {/* 50/30/20 */}
      {effectiveSalary>0 && (
        <Card tk={tk}>
          <div className="flex items-center gap-2 mb-4"><Percent className="w-4 h-4" style={{ color:tk.GOLD }}/><span className="text-sm font-bold" style={{ color:tk.INK }}>{tr.rule5030}</span></div>
          {[
            {label:tr.ruleNeeds, hint:tr.ruleNeedsHint,  actual:rule5030.needs+0,          target:rule5030.targets.needs,   pctT:50, color:tk.EMERALD, warn:false},
            {label:tr.ruleWants, hint:tr.ruleWantsHint,  actual:rule5030.wants,              target:rule5030.targets.wants,   pctT:30, color:'#7C3AED',  warn:true},
            {label:tr.ruleSavings,hint:tr.ruleSavingsHint,actual:Math.max(0,rule5030.actualSavings),target:rule5030.targets.savings,pctT:20,color:tk.GOLD,warn:false},
          ].map(row=>{
            const pct=effectiveSalary>0?Math.min((row.actual/effectiveSalary)*100,100):0;
            const over=row.actual>row.target&&row.warn;
            return (
              <div key={row.label} className="mb-4 last:mb-0">
                <div className="flex items-start justify-between mb-1.5">
                  <div><div className="text-xs font-bold" style={{ color:tk.INK }}>{row.label}</div><div className="text-[10px]" style={{ color:tk.MUTED }}>{row.hint}</div></div>
                  <div className="text-end"><div className="text-xs font-bold" style={{ color:over?tk.TERRA:tk.EMERALD, fontVariantNumeric:'tabular-nums' }}>{fmtMAD(row.actual,lang)}</div><div className="text-[10px]" style={{ color:tk.MUTED }}>{tr.ruleTarget}: {fmtMAD(row.target,lang)}</div></div>
                </div>
                <div className="relative h-3 rounded-full overflow-hidden" style={{ background:tk.BG_DEEP }}>
                  <div className="absolute inset-y-0 start-0 rounded-full" style={{ width:`${pct}%`, background:over?tk.TERRA:row.color }}/>
                  <div className="absolute inset-y-0 w-0.5 opacity-30" style={{ [isRTL?'right':'left']:`${row.pctT}%`, background:tk.INK }}/>
                </div>
                <div className="text-[10px] mt-0.5" style={{ color:over?tk.TERRA:tk.MUTED }}>{Math.round(pct)}% {tr.ruleActual} · {tr.ruleTarget}: {row.pctT}%</div>
              </div>
            );
          })}
        </Card>
      )}

      {/* Savings rate */}
      {effectiveSalary>0 && (
        <Card tk={tk} highlight={savingsRate>=20?tk.EMERALD:tk.BORDER}>
          <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><TrendingUp className="w-4 h-4" style={{ color:savingsRate>=20?tk.EMERALD:tk.GOLD }}/><span className="text-sm font-bold" style={{ color:tk.INK }}>{tr.savingsRate}</span></div><span className="text-[10px]" style={{ color:tk.MUTED }}>{tr.savingsRateIdeal}</span></div>
          <div className="flex items-baseline gap-3 mb-3"><div className="text-4xl font-black" style={{ color:savingsRate>=20?tk.EMERALD:savingsRate<0?tk.TERRA:tk.GOLD, fontFamily:tk.fontD }}>{savingsRate<0?'0':Math.round(savingsRate)}%</div><div className="text-xs" style={{ color:tk.MUTED }}>{fmtMAD(Math.max(0,rule5030.actualSavings),lang)} {lang==='ar'?'متوفَّر':'économisé'}</div></div>
          <div className="h-3 rounded-full overflow-hidden mb-2" style={{ background:tk.BG_DEEP }}><div className="h-full rounded-full" style={{ width:`${Math.min(Math.max(savingsRate,0),100)}%`, background:savingsRate>=20?tk.EMERALD:savingsRate<10?tk.TERRA:tk.GOLD }}/></div>
          <div className="text-xs font-semibold" style={{ color:savingsRate>=20?tk.EMERALD:tk.MUTED }}>{savingsRate>=20?tr.savingsRateGood:tr.savingsRateLow}</div>
        </Card>
      )}

      {/* Projection */}
      {effectiveSalary>0&&daysElapsed>0 && (
        <Card tk={tk}>
          <div className="flex items-center gap-2 mb-3"><TrendingDown className="w-4 h-4" style={{ color:tk.MUTED }}/><span className="text-sm font-bold" style={{ color:tk.INK }}>{tr.projection}</span></div>
          <div className="text-xs mb-3" style={{ color:tk.MUTED }}>{tr.projectionAt}</div>
          <div className="grid grid-cols-3 gap-3">
            {[
              {label:lang==='ar'?'المصاريف المتوقعة':'Dépenses prévues', value:projection,      color:tk.TERRA},
              {label:lang==='ar'?'المتاح':'Disponible',                  value:disposable,      color:tk.EMERALD},
              {label:lang==='ar'?'التوقع':'Prévu',                       value:projectedLeft,   color:projectedLeft>=0?tk.EMERALD:tk.TERRA, bg:projectedLeft>=0?tk.OK:tk.WARN},
            ].map(({label,value,color,bg})=>(
              <div key={label} className="text-center p-3 rounded-xl" style={{ background:bg??tk.BG_DEEP }}>
                <div className="text-[10px] font-semibold mb-1" style={{ color:tk.MUTED, textTransform:'uppercase' }}>{label}</div>
                <div className="text-sm font-bold" style={{ color, fontVariantNumeric:'tabular-nums' }}>{value<0?'−':''}{fmtMAD(value,lang)}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Pie */}
      <Card tk={tk}>
        <div className="text-xs font-bold mb-4" style={{ color:tk.INK, textTransform:isRTL?'none':'uppercase', letterSpacing:isRTL?0:'0.1em' }}>{tr.byCategory}</div>
        {total===0 ? <div className="text-center py-10 text-sm" style={{ color:tk.MUTED }}>{tr.noExpenses}</div> : (
          <>
            <div className="h-48 relative" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2} stroke={tk.SURFACE} strokeWidth={2}>{pieData.map((d,i)=><Cell key={i} fill={d.color}/>)}</Pie></PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-[10px]" style={{ color:tk.MUTED }}>Total</div>
                <div className="text-lg font-bold" style={{ color:tk.INK, fontFamily:tk.fontD, fontVariantNumeric:'tabular-nums' }}>{fmtMAD(total,lang)}</div>
              </div>
            </div>
            <div className="mt-4 space-y-2">{pieData.map(d=>(
              <div key={d.id} className="flex items-center gap-3"><div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:d.color }}/><span className="flex-1 text-xs font-semibold truncate" style={{ color:tk.INK }}>{d.name}</span><span className="text-xs" style={{ color:tk.MUTED }}>{((d.value/total)*100).toFixed(0)}%</span><span className="text-xs font-bold w-20 text-end" style={{ color:tk.INK, fontVariantNumeric:'tabular-nums' }}>{fmtMAD(d.value,lang)}</span></div>
            ))}</div>
          </>
        )}
      </Card>

      {/* Daily bar */}
      <Card tk={tk}>
        <div className="text-xs font-bold mb-4" style={{ color:tk.INK, textTransform:isRTL?'none':'uppercase', letterSpacing:isRTL?0:'0.1em' }}>{tr.byDay}</div>
        <div className="h-40" dir="ltr"><ResponsiveContainer width="100%" height="100%"><BarChart data={dailyData} margin={{top:5,right:5,left:5,bottom:5}}><XAxis dataKey="day" tick={{fill:tk.MUTED,fontSize:9}} axisLine={false} tickLine={false}/><YAxis hide/><Tooltip cursor={{fill:tk.BG_DEEP}} contentStyle={{background:tk.SURFACE,border:`1px solid ${tk.BORDER}`,borderRadius:8,fontSize:11,color:tk.INK}} formatter={v=>[`${v} DH`,'Total']}/><Bar dataKey="value" fill={tk.EMERALD} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div>
      </Card>

      {/* 6-month comparison */}
      <Card tk={tk}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold" style={{ color:tk.INK, textTransform:isRTL?'none':'uppercase', letterSpacing:isRTL?0:'0.1em' }}>{tr.monthComparison}</span>
          <div className="flex items-center gap-3 text-[10px]">
            {[{c:tk.EMERALD,l:tr.income_short},{c:tk.TERRA,l:tr.expense_short}].map(({c,l})=><div key={l} className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm" style={{ background:c }}/><span style={{ color:tk.MUTED }}>{l}</span></div>)}
          </div>
        </div>
        <div className="h-40" dir="ltr"><ResponsiveContainer width="100%" height="100%"><BarChart data={monthsData} margin={{top:5,right:5,left:5,bottom:5}}><XAxis dataKey="name" tick={{fill:tk.MUTED,fontSize:10}} axisLine={false} tickLine={false}/><YAxis hide/><Tooltip cursor={{fill:tk.BG_DEEP}} contentStyle={{background:tk.SURFACE,border:`1px solid ${tk.BORDER}`,borderRadius:8,fontSize:11,color:tk.INK}}/><Bar dataKey="income" fill={tk.EMERALD} radius={[4,4,0,0]}/><Bar dataKey="expense" fill={tk.TERRA} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div>
      </Card>
    </div>
  );
}

// ── Budget View ───────────────────────────────────────────
function BudgetView({ tr, lang, isRTL, tokens, budgets, setBudgets, byCat, expenseTotal }) {
  const tk=tokens;
  const totalBudget=Object.values(budgets).reduce((s,v)=>s+(parseFloat(v)||0),0);
  const overallPct=totalBudget>0?(expenseTotal/totalBudget)*100:0;
  const upd=(id,v)=>setBudgets(prev=>{ const n={...prev}; const f=parseFloat(v); if(!v||isNaN(f)||f<=0) delete n[id]; else n[id]=f; return n; });

  return (
    <div className="space-y-5">
      <div><div style={{ fontFamily:tk.fontD, fontWeight:600, fontSize:'1.5rem', color:tk.EMERALD }}>{tr.setBudget}</div><div style={{ color:tk.MUTED, fontSize:'0.75rem' }}>{tr.monthlyBudget}</div></div>
      {totalBudget>0 && (
        <div className="rounded-2xl p-5" style={{ background:`linear-gradient(135deg,${tk.EMERALD},${tk.EMERALD_DARK})`, color:'#FFFDF8' }}>
          <div className="text-[10px] opacity-70 uppercase mb-2">{tr.progress}</div>
          <div className="flex items-baseline justify-between mb-3"><div style={{ fontFamily:tk.fontD, fontWeight:600, fontSize:'1.5rem', fontVariantNumeric:'tabular-nums' }}>{fmtMAD(expenseTotal,lang)}</div><div className="text-xs opacity-80">/ {fmtMAD(totalBudget,lang)}</div></div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background:'rgba(255,253,248,0.2)' }}><div className="h-full rounded-full" style={{ width:`${Math.min(overallPct,100)}%`, background:overallPct>=100?tk.TERRA:overallPct>=80?tk.GOLD:'#FFFDF8' }}/></div>
          <div className="mt-2 text-xs opacity-80">{Math.round(overallPct)}% {tr.ofBudget}</div>
        </div>
      )}
      <div className="space-y-3">
        {expenseCats().map(c=>{ const Icon=c.icon; const limit=budgets[c.id]||0; const spent=byCat[c.id]||0; const pct=limit>0?(spent/limit)*100:0; const over=pct>=100; const near=pct>=80&&!over; return (
          <Card tk={tk} key={c.id}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:c.color+'15' }}><Icon className="w-4 h-4" style={{ color:c.color }}/></div>
              <div className="flex-1 text-sm font-bold" style={{ color:tk.INK }}>{lang==='ar'?c.ar:c.fr}</div>
              <div className="flex items-center gap-1.5"><input type="number" inputMode="decimal" placeholder="0" value={limit||''} onChange={e=>upd(c.id,e.target.value)} className="w-20 text-end text-sm font-semibold bg-transparent outline-none rounded-lg px-2 py-1" style={{ color:tk.INK, border:`1px solid ${tk.BORDER}`, fontVariantNumeric:'tabular-nums', direction:'ltr' }}/><span className="text-xs font-semibold" style={{ color:tk.MUTED }}>{tr.mad}</span></div>
            </div>
            {limit>0 && <>
              <div className="flex items-center justify-between text-[11px] mb-1.5" style={{ color:tk.MUTED }}><span>{tr.spent}: <span className="font-semibold" style={{ color:tk.INK, fontVariantNumeric:'tabular-nums' }}>{fmtMAD(spent,lang)}</span></span><span style={{ color:over?tk.TERRA:near?tk.GOLD:tk.MUTED, fontWeight:600 }}>{Math.round(pct)}%</span></div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background:tk.BG_DEEP }}><div className="h-full rounded-full" style={{ width:`${Math.min(pct,100)}%`, background:over?tk.TERRA:near?tk.GOLD:c.color }}/></div>
              {over&&<div className="flex items-center gap-1 mt-2 text-[11px] font-semibold" style={{ color:tk.TERRA }}><AlertTriangle className="w-3 h-3"/>{tr.overBudget}</div>}
              {near&&!over&&<div className="flex items-center gap-1 mt-2 text-[11px] font-semibold" style={{ color:tk.GOLD }}><AlertTriangle className="w-3 h-3"/>{tr.nearLimit}</div>}
            </>}
          </Card>
        );})}
      </div>
    </div>
  );
}

// ── Settings View ─────────────────────────────────────────
function SettingsView({ tr, lang, isRTL, tokens, salary, setSalary, paydayDay, setPaydayDay, recurringTotal, recurringCount, theme, setTheme, setLang, templatesCount, onExportCsv, onExportJson, onImportJson, onClearAll, setSubView }) {
  const tk=tokens;
  const [salaryInput, setSalaryInput]=useState(salary>0?salary.toString():'');
  const [pdInput, setPdInput]=useState(paydayDay>0?paydayDay.toString():'');

  const disposable=((parseFloat(salaryInput)||salary)||0)-recurringTotal;

  return (
    <div className="space-y-5">
      <div style={{ fontFamily:tk.fontD, fontWeight:600, fontSize:'1.5rem', color:tk.EMERALD }}>{tr.settings}</div>

      {/* ── Salary ── */}
      <div className="rounded-2xl overflow-hidden" style={{ border:`1px solid ${tk.BORDER}` }}>
        <div className="flex items-center gap-2 px-4 py-3" style={{ background:tk.EMERALD }}>
          <Briefcase className="w-4 h-4" style={{ color:'#FFFDF8' }}/>
          <span className="text-sm font-bold" style={{ color:'#FFFDF8' }}>{tr.monthlySalary}</span>
        </div>
        <div className="p-4" style={{ background:tk.SURFACE }}>
          <div className="flex items-baseline gap-2">
            <input type="number" inputMode="decimal" value={salaryInput}
              onChange={e=>setSalaryInput(e.target.value)}
              onBlur={()=>{ const v=parseFloat(salaryInput); setSalary(isNaN(v)||v<=0?0:v); }}
              placeholder="0.00" className="flex-1 bg-transparent outline-none text-3xl font-bold"
              style={{ color:tk.EMERALD, fontFamily:tk.fontD, fontVariantNumeric:'tabular-nums', direction:'ltr', textAlign:isRTL?'right':'left' }}/>
            <span style={{ color:tk.GOLD, fontFamily:tk.fontD, fontSize:'1.25rem', fontWeight:600 }}>{tr.mad}</span>
          </div>
        </div>

        {/* Disposable summary: salary − recurring = available */}
        {recurringTotal > 0 && (
          <div className="px-4 py-3 space-y-1" style={{ background:tk.BG_DEEP, borderTop:`1px solid ${tk.BORDER}` }}>
            <div className="flex justify-between text-xs" style={{ color:tk.MUTED }}>
              <span>{tr.salary_label}</span>
              <span style={{ fontVariantNumeric:'tabular-nums' }}>{fmtMAD(parseFloat(salaryInput)||salary||0,lang)}</span>
            </div>
            <div className="flex justify-between text-xs" style={{ color:tk.TERRA }}>
              <span>− {tr.fixed_label} ({recurringCount} {lang==='ar'?'دورية':'charges'})</span>
              <span style={{ fontVariantNumeric:'tabular-nums' }}>{fmtMAD(recurringTotal,lang)}</span>
            </div>
            <Divider tk={tk}/>
            <div className="flex justify-between text-sm font-bold">
              <span style={{ color:tk.INK }}>{tr.disposableIncome}</span>
              <span style={{ color:disposable>=0?tk.EMERALD:tk.TERRA, fontVariantNumeric:'tabular-nums' }}>{disposable<0?'−':''}{fmtMAD(disposable,lang)}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Recurring = Fixed Costs ── */}
      <div className="rounded-2xl overflow-hidden" style={{ border:`1px solid ${tk.BORDER}` }}>
        <div className="flex items-center justify-between px-4 py-3" style={{ background:tk.BG_DEEP }}>
          <div className="flex items-center gap-2">
            <Repeat className="w-4 h-4" style={{ color:tk.TERRA }}/>
            <span className="text-sm font-bold" style={{ color:tk.INK }}>{tr.recurring}</span>
          </div>
          {recurringTotal>0 && <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background:tk.TERRA+'20', color:tk.TERRA }}>− {fmtMAD(recurringTotal,lang)}</span>}
        </div>
        <div className="p-4" style={{ background:tk.SURFACE }}>
          <p className="text-xs mb-3" style={{ color:tk.MUTED }}>{tr.recurringHint}</p>
          <p className="text-xs mb-4 leading-relaxed" style={{ color:tk.MUTED }}>
            {lang==='ar'
              ? 'مصاريفك الثابتة كل شهر (إيجار، كهرباء، أنترنت…). يُطرح مجموعها من راتبك تلقائياً. في يوم استحقاقها، ستظهر في الرئيسية لتضيفها بنقرة.'
              : 'Vos charges fixes mensuelles (loyer, électricité, internet…). Leur total est automatiquement déduit de votre salaire. À leur date, elles apparaissent sur l\'accueil pour être ajoutées en un tap.'}
          </p>
          <button onClick={()=>setSubView('recurring')} className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2" style={{ background:tk.EMERALD, color:tk.ON_EMERALD }}>
            <Repeat className="w-4 h-4"/>{tr.manageRecurring}{recurringCount>0?` (${recurringCount})`:''}
          </button>
        </div>
      </div>

      {/* ── Payday ── */}
      <Card tk={tk}>
        <div className="flex items-center gap-2 mb-3"><Clock className="w-4 h-4" style={{ color:tk.GOLD }}/><span className="text-sm font-bold" style={{ color:tk.INK }}>{tr.paydayDay}</span></div>
        <div className="flex items-center gap-3">
          <input type="number" inputMode="numeric" min="1" max="31" value={pdInput}
            onChange={e=>setPdInput(e.target.value)}
            onBlur={()=>{ const v=parseInt(pdInput); setPaydayDay(isNaN(v)||v<1||v>31?0:v); }}
            placeholder={lang==='ar'?'مثال: 1':'Ex : 1'} className="w-24 bg-transparent outline-none text-2xl font-bold text-center rounded-xl py-2"
            style={{ color:tk.EMERALD, fontFamily:tk.fontD, border:`1px solid ${tk.BORDER}`, direction:'ltr', fontVariantNumeric:'tabular-nums' }}/>
          <span className="text-xs" style={{ color:tk.MUTED }}>{lang==='ar'?'من كل شهر':'de chaque mois'}</span>
        </div>
      </Card>

      {/* ── Theme ── */}
      <Card tk={tk}>
        <div className="text-xs font-bold mb-3" style={{ color:tk.MUTED, textTransform:'uppercase', letterSpacing:'0.1em' }}>{tr.theme}</div>
        <div className="grid grid-cols-2 gap-2">
          {[{id:'light',label:tr.lightMode,icon:Sun},{id:'dark',label:tr.darkMode,icon:Moon}].map(({id,label,icon:Icon})=>(
            <button key={id} onClick={()=>setTheme(id)} className="py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5" style={{ background:theme===id?tk.EMERALD:tk.BG_DEEP, color:theme===id?tk.ON_EMERALD:tk.INK }}><Icon className="w-4 h-4"/>{label}</button>
          ))}
        </div>
      </Card>

      {/* ── Language ── */}
      <Card tk={tk}>
        <div className="text-xs font-bold mb-3" style={{ color:tk.MUTED, textTransform:'uppercase', letterSpacing:'0.1em' }}>{tr.language}</div>
        <div className="grid grid-cols-2 gap-2">
          {[{id:'ar',label:'العربية'},{id:'fr',label:'Français'}].map(({id,label})=>(
            <button key={id} onClick={()=>setLang(id)} className="py-3 rounded-xl text-sm font-semibold" style={{ background:lang===id?tk.EMERALD:tk.BG_DEEP, color:lang===id?tk.ON_EMERALD:tk.INK }}>{label}</button>
          ))}
        </div>
      </Card>

      {/* ── Manage ── */}
      <div className="space-y-2">
        <div className="text-xs font-bold mb-1 px-1" style={{ color:tk.MUTED, textTransform:'uppercase', letterSpacing:'0.1em' }}>{tr.manage}</div>
        {[
          {icon:PiggyBank, label:tr.savingsGoals,                                              sub:'goals'},
          {icon:Zap,       label:`${tr.templates}${templatesCount?` · ${templatesCount}`:''}`, sub:'templates'},
        ].map(({icon:Icon,label,sub})=>(
          <button key={sub} onClick={()=>setSubView(sub)} className="w-full flex items-center gap-3 p-4 rounded-2xl" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}`, color:tk.INK }}>
            <Icon className="w-4 h-4" style={{ color:tk.EMERALD }}/><span className="text-sm font-semibold flex-1 text-start">{label}</span><ChevronRight className="w-4 h-4" style={{ color:tk.MUTED }}/>
          </button>
        ))}
      </div>

      {/* ── Data ── */}
      <div className="space-y-2">
        <div className="text-xs font-bold mb-1 px-1" style={{ color:tk.MUTED, textTransform:'uppercase', letterSpacing:'0.1em' }}>Data</div>
        {[{label:tr.exportCsv,fn:onExportCsv},{label:tr.exportJson,fn:onExportJson}].map(({label,fn})=>(
          <button key={label} onClick={fn} className="w-full flex items-center gap-3 p-4 rounded-2xl" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}`, color:tk.INK }}>
            <Download className="w-4 h-4" style={{ color:tk.EMERALD }}/><span className="text-sm font-semibold flex-1 text-start">{label}</span>
          </button>
        ))}
        <label className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}`, color:tk.INK }}>
          <Download className="w-4 h-4" style={{ color:tk.EMERALD, transform:'rotate(180deg)' }}/><span className="text-sm font-semibold flex-1">{tr.importJson}</span>
          <input type="file" accept="application/json" className="hidden" onChange={e=>{ if(e.target.files?.[0]){onImportJson(e.target.files[0]);e.target.value='';} }}/>
        </label>
      </div>

      <button onClick={onClearAll} className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl text-sm font-semibold" style={{ background:tk.SURFACE, border:`1px solid ${tk.TERRA}40`, color:tk.TERRA }}>
        <Trash2 className="w-4 h-4"/>{tr.clearAll}
      </button>

      <div className="text-center text-[10px] pt-6 pb-2" style={{ color:tk.MUTED, fontFamily:tk.fontD, letterSpacing:'0.1em' }}>
        {lang==='ar'?'محاسبي  ·  بالمغرب':'Mes Comptes · Fait au Maroc'}
      </div>
    </div>
  );
}

// ── Goals View ────────────────────────────────────────────
function GoalsView({ tr, lang, isRTL, tokens, goals, onBack, onSave, onAdjust, onDelete }) {
  const tk=tokens;
  const [editing, setEditing]=useState(null);
  const [adjusting, setAdjusting]=useState(null);
  const [deletingId, setDeletingId]=useState(null);
  return (
    <>
      <header className="px-5 pt-6 pb-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="p-2 rounded-full" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}`, color:tk.EMERALD }}>{isRTL?<ChevronRight className="w-4 h-4"/>:<ChevronLeft className="w-4 h-4"/>}</button>
          <div className="text-center"><div style={{ fontFamily:tk.fontD, fontWeight:600, fontSize:'1.25rem', color:tk.EMERALD }}>{tr.savingsGoals}</div><div style={{ color:tk.MUTED, fontSize:'0.65rem' }}>{tr.goalsSubtitle}</div></div>
          <button onClick={()=>setEditing('new')} className="p-2 rounded-full" style={{ background:tk.EMERALD, color:tk.ON_EMERALD }}><Plus className="w-4 h-4"/></button>
        </div>
      </header>
      <main className="px-5 max-w-2xl mx-auto" style={{ paddingBottom:'calc(env(safe-area-inset-bottom, 0px) + 7rem)' }}>
        {goals.length===0
          ? <div className="rounded-2xl p-8 text-center mt-6" style={{ background:tk.SURFACE, border:`1px dashed ${tk.BORDER}` }}><div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ background:tk.GOLD+'20' }}><PiggyBank className="w-6 h-6" style={{ color:tk.GOLD }}/></div><div className="text-sm font-semibold mb-1" style={{ color:tk.INK, fontFamily:tk.fontD }}>{tr.noGoals}</div><div className="text-xs mb-4" style={{ color:tk.MUTED }}>{tr.startGoal}</div><button onClick={()=>setEditing('new')} className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background:tk.EMERALD, color:tk.ON_EMERALD }}>+ {tr.newGoal}</button></div>
          : <div className="space-y-3">{goals.map(g=>{ const ic=GOAL_ICONS[g.iconId]??GOAL_ICONS.other; const Icon=ic.icon; const pct=Goal.progress(g); const complete=pct>=100; return (
            <Card tk={tk} key={g.id} highlight={complete?ic.color:undefined}>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background:ic.color+'20' }}><Icon className="w-5 h-5" style={{ color:ic.color }}/></div>
                <div className="flex-1 min-w-0"><div style={{ fontFamily:tk.fontD, fontWeight:700, color:tk.INK }}>{g.name}</div>{g.targetDate&&<div style={{ color:tk.MUTED, fontSize:'0.7rem' }}>{fmtDate(g.targetDate,lang,tr)}</div>}</div>
                <div className="flex gap-1">
                  <button onClick={()=>setEditing(g)} className="p-1.5 rounded-lg" style={{ background:tk.BG_DEEP, color:tk.MUTED }}><Pencil className="w-3.5 h-3.5"/></button>
                  <button onClick={()=>setDeletingId(g.id)} className="p-1.5 rounded-lg" style={{ background:tk.WARN, color:tk.TERRA }}><Trash2 className="w-3.5 h-3.5"/></button>
                </div>
              </div>
              <div className="flex items-baseline justify-between mb-2"><div style={{ fontFamily:tk.fontD, fontWeight:700, fontSize:'1.25rem', color:tk.INK, fontVariantNumeric:'tabular-nums' }}>{fmtMAD(g.saved??0,lang)}</div><div style={{ color:tk.MUTED, fontSize:'0.75rem' }}>/ {fmtMAD(g.target,lang)}</div></div>
              <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background:tk.BG_DEEP }}><div className="h-full rounded-full" style={{ width:`${pct}%`, background:complete?tk.EMERALD:ic.color }}/></div>
              <div className="flex items-center justify-between text-[11px] mb-4"><span style={{ color:complete?tk.EMERALD:tk.MUTED, fontWeight:600 }}>{complete?tr.goalComplete:`${Math.round(pct)}%`}</span>{!complete&&<span style={{ color:tk.MUTED }}>{tr.remainingToGoal}: <span className="font-semibold" style={{ color:tk.INK, fontVariantNumeric:'tabular-nums' }}>{fmtMAD(Goal.remaining(g),lang)}</span></span>}</div>
              <div className="flex gap-2">
                <button onClick={()=>setAdjusting({id:g.id,mode:'deposit'})}  className="flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5" style={{ background:tk.EMERALD, color:tk.ON_EMERALD }}><Plus className="w-3.5 h-3.5"/>{tr.deposit}</button>
                <button onClick={()=>setAdjusting({id:g.id,mode:'withdraw'})} className="flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5" style={{ background:tk.BG_DEEP, color:tk.INK }}><Minus className="w-3.5 h-3.5"/>{tr.withdraw}</button>
              </div>
            </Card>
          );})}</div>
        }
      </main>
      {editing&&<GoalModal tr={tr} lang={lang} isRTL={isRTL} tokens={tokens} initial={editing==='new'?null:editing} onCancel={()=>setEditing(null)} onSave={g=>{onSave(g);setEditing(null);}}/>}
      {adjusting&&<AdjustModal tr={tr} lang={lang} tokens={tokens} mode={adjusting.mode} onCancel={()=>setAdjusting(null)} onConfirm={amt=>{onAdjust(adjusting.id,adjusting.mode==='deposit'?amt:-amt);setAdjusting(null);}}/>}
      {deletingId&&<Confirm tokens={tokens} text={tr.confirmDelete} tr={tr} onCancel={()=>setDeletingId(null)} onConfirm={()=>{onDelete(deletingId);setDeletingId(null);}}/>}
    </>
  );
}

function GoalModal({ tr, lang, isRTL, tokens, initial, onCancel, onSave }) {
  const tk=tokens;
  const [name,       setName]      =useState(initial?.name??'');
  const [iconId,     setIconId]    =useState(initial?.iconId??'other');
  const [target,     setTarget]    =useState(initial?.target?.toString()??'');
  const [saved,      setSaved]     =useState(initial?.saved?.toString()??'0');
  const [targetDate, setTargetDate]=useState(initial?.targetDate??'');
  const canSave=name.trim()&&parseFloat(target)>0;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background:tk.OVERLAY }} onClick={onCancel}>
      <div className="w-full max-w-md rounded-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto" style={{ background:tk.BG, border:`1px solid ${tk.BORDER}` }} dir={isRTL?'rtl':'ltr'} onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between"><div style={{ fontFamily:tk.fontD, fontWeight:600, color:tk.INK }}>{initial?tr.editGoal:tr.newGoal}</div><button onClick={onCancel} style={{ color:tk.MUTED }}><X className="w-4 h-4"/></button></div>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(GOAL_ICONS).map(([id,ic])=>{ const Icon=ic.icon; const sel=iconId===id; return (
            <button key={id} onClick={()=>{ setIconId(id); if(!name)setName(tr.goalTypes[id]??''); }} className="p-3 rounded-xl flex flex-col items-center gap-1" style={{ background:sel?ic.color:tk.SURFACE, color:sel?'#FFFDF8':tk.INK, border:`1px solid ${sel?ic.color:tk.BORDER}` }}>
              <Icon className="w-4 h-4"/><span className="text-[9px] font-semibold">{tr.goalTypes[id]}</span>
            </button>
          );})}
        </div>
        <div className="rounded-xl p-3 space-y-3" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}` }}>
          <div><Label tk={tk} isRTL={isRTL}>{tr.goalName}</Label><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder={tr.goalNamePh} className="w-full bg-transparent outline-none text-sm font-semibold mt-1" style={{ color:tk.INK }}/></div>
          <Divider tk={tk}/>
          <div className="grid grid-cols-2 gap-3">
            {[[tr.target,target,setTarget],[tr.saved,saved,setSaved]].map(([l,v,fn])=><div key={l}><Label tk={tk} isRTL={isRTL}>{l}</Label><input type="number" inputMode="decimal" value={v} onChange={e=>fn(e.target.value)} placeholder="0" className="w-full bg-transparent outline-none text-sm font-semibold mt-1" style={{ color:tk.INK, direction:'ltr', textAlign:isRTL?'right':'left', fontVariantNumeric:'tabular-nums' }}/></div>)}
          </div>
          <Divider tk={tk}/>
          <div><Label tk={tk} isRTL={isRTL}>{tr.targetDateOpt}</Label><input type="date" value={targetDate} onChange={e=>setTargetDate(e.target.value)} className="w-full bg-transparent outline-none text-sm font-semibold mt-1" style={{ color:tk.INK, direction:'ltr' }}/></div>
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl text-sm font-semibold" style={{ background:tk.BG_DEEP, color:tk.INK }}>{tr.cancel}</button>
          <button onClick={()=>canSave&&onSave({id:initial?.id,name:name.trim(),iconId,target:parseFloat(target),saved:parseFloat(saved)||0,targetDate:targetDate||null})} disabled={!canSave} className="flex-[2] py-3 rounded-xl text-sm font-semibold" style={{ background:canSave?tk.EMERALD:tk.MUTED, color:tk.ON_EMERALD, opacity:canSave?1:0.5 }}>
            {initial?tr.save:tr.createGoal}
          </button>
        </div>
      </div>
    </div>
  );
}

function AdjustModal({ tr, lang, tokens, mode, onCancel, onConfirm }) {
  const tk=tokens; const [amt,setAmt]=useState(''); const can=parseFloat(amt)>0; const dep=mode==='deposit';
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background:tk.OVERLAY }} onClick={onCancel}>
      <div className="w-full max-w-sm rounded-2xl p-5 space-y-4" style={{ background:tk.BG, border:`1px solid ${tk.BORDER}` }} onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between"><div className="flex items-center gap-2" style={{ fontFamily:tk.fontD, fontWeight:600, color:tk.INK }}>{dep?<Plus className="w-5 h-5" style={{ color:tk.EMERALD }}/>:<Minus className="w-5 h-5" style={{ color:tk.TERRA }}/>}{dep?tr.deposit:tr.withdraw}</div><button onClick={onCancel} style={{ color:tk.MUTED }}><X className="w-4 h-4"/></button></div>
        <div className="rounded-xl p-4 flex items-baseline gap-2" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}` }}>
          <input type="number" inputMode="decimal" value={amt} autoFocus onChange={e=>setAmt(e.target.value)} placeholder="0.00" className="flex-1 bg-transparent outline-none text-3xl font-bold" style={{ color:tk.INK, fontFamily:tk.fontD, fontVariantNumeric:'tabular-nums', direction:'ltr' }}/>
          <span style={{ color:tk.GOLD, fontFamily:tk.fontD, fontSize:'1.25rem', fontWeight:600 }}>{tr.mad}</span>
        </div>
        <div className="flex gap-2"><button onClick={onCancel} className="flex-1 py-3 rounded-xl text-sm font-semibold" style={{ background:tk.BG_DEEP, color:tk.INK }}>{tr.cancel}</button><button onClick={()=>can&&onConfirm(parseFloat(amt))} disabled={!can} className="flex-[2] py-3 rounded-xl text-sm font-semibold" style={{ background:can?(dep?tk.EMERALD:tk.TERRA):tk.MUTED, color:'#FFFDF8', opacity:can?1:0.5 }}>{tr.confirm}</button></div>
      </div>
    </div>
  );
}

// ── Templates View ────────────────────────────────────────
function TemplatesView({ tr, lang, isRTL, tokens, templates, setTemplates, onBack, onUse }) {
  const tk=tokens;
  return (
    <>
      <header className="px-5 pt-6 pb-4 max-w-2xl mx-auto"><div className="flex items-center justify-between"><button onClick={onBack} className="p-2 rounded-full" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}`, color:tk.EMERALD }}>{isRTL?<ChevronRight className="w-4 h-4"/>:<ChevronLeft className="w-4 h-4"/>}</button><div style={{ fontFamily:tk.fontD, fontWeight:600, fontSize:'1.25rem', color:tk.EMERALD }}>{tr.templates}</div><div className="w-8"/></div></header>
      <main className="px-5 max-w-2xl mx-auto" style={{ paddingBottom:'calc(env(safe-area-inset-bottom, 0px) + 7rem)' }}>
        {templates.length===0
          ? <div className="rounded-2xl p-8 text-center mt-6" style={{ background:tk.SURFACE, border:`1px dashed ${tk.BORDER}` }}><Zap className="w-8 h-8 mx-auto mb-2" style={{ color:tk.GOLD }}/><div className="text-sm font-semibold" style={{ color:tk.INK, fontFamily:tk.fontD }}>{tr.noTemplates}</div><div className="text-xs mt-1" style={{ color:tk.MUTED }}>{tr.addTemplateHint}</div></div>
          : <div className="space-y-2">{templates.map(t=>{ const cat=getCat(t.category); const Icon=cat.icon; return (
            <div key={t.id} className="rounded-xl p-3 flex items-center gap-3" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:cat.color+'15' }}><Icon className="w-4 h-4" style={{ color:cat.color }}/></div>
              <div className="flex-1 min-w-0"><div className="text-sm font-semibold truncate" style={{ color:tk.INK }}>{t.name}</div><div className="text-[11px]" style={{ color:tk.MUTED }}>{lang==='ar'?cat.ar:cat.fr}{t.amount?` · ${fmtMAD(t.amount,lang)}`:''}</div></div>
              <button onClick={()=>onUse(t)} className="p-2 rounded-lg" style={{ background:tk.EMERALD, color:tk.ON_EMERALD }}><Plus className="w-3.5 h-3.5"/></button>
              <button onClick={()=>setTemplates(p=>p.filter(x=>x.id!==t.id))} className="p-2 rounded-lg" style={{ background:tk.WARN, color:tk.TERRA }}><Trash2 className="w-3.5 h-3.5"/></button>
            </div>
          );})}
          </div>
        }
      </main>
    </>
  );
}

// ── Recurring View ────────────────────────────────────────
function RecurringView({ tr, lang, isRTL, tokens, recurring, setRecurring, onBack }) {
  const tk=tokens;
  const [editing, setEditing]=useState(null);
  const save=(rec)=>{ setRecurring(prev=>{ if(rec.id&&prev.find(r=>r.id===rec.id)) return prev.map(r=>r.id===rec.id?Recurring.make({...r,...rec}):r); return [...prev,Recurring.make(rec)]; }); setEditing(null); };
  const remove=(id)=>setRecurring(prev=>prev.filter(r=>r.id!==id));
  const total=Recurring.totalCost(recurring);

  return (
    <>
      <header className="px-5 pt-6 pb-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="p-2 rounded-full" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}`, color:tk.EMERALD }}>{isRTL?<ChevronRight className="w-4 h-4"/>:<ChevronLeft className="w-4 h-4"/>}</button>
          <div className="text-center"><div style={{ fontFamily:tk.fontD, fontWeight:600, fontSize:'1.25rem', color:tk.EMERALD }}>{tr.recurring}</div>{total>0&&<div className="text-xs font-bold" style={{ color:tk.TERRA }}>− {fmtMAD(total,lang)} / {lang==='ar'?'شهر':'mois'}</div>}</div>
          <button onClick={()=>setEditing({})} className="p-2 rounded-full" style={{ background:tk.EMERALD, color:tk.ON_EMERALD }}><Plus className="w-4 h-4"/></button>
        </div>
      </header>
      <main className="px-5 max-w-2xl mx-auto" style={{ paddingBottom:'calc(env(safe-area-inset-bottom, 0px) + 7rem)' }}>
        <div className="rounded-xl p-3 mb-4 text-xs leading-relaxed" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}`, color:tk.MUTED }}>
          {lang==='ar'
            ? '💡 هذه هي مصاريفك الثابتة كل شهر. مجموعها يُطرح من راتبك في الرئيسية. عند حلول يوم الاستحقاق، تظهر في الرئيسية لتضيفها بنقرة واحدة وتُسجَّل في السجل.'
            : '💡 Ce sont vos charges fixes mensuelles. Leur total est déduit de votre salaire sur l\'accueil. À chaque échéance, elles apparaissent pour être ajoutées en un tap et enregistrées dans le journal.'}
        </div>
        {recurring.length===0
          ? <div className="rounded-2xl p-8 text-center" style={{ background:tk.SURFACE, border:`1px dashed ${tk.BORDER}` }}><Repeat className="w-8 h-8 mx-auto mb-2" style={{ color:tk.GOLD }}/><div className="text-sm font-semibold mb-1" style={{ color:tk.INK, fontFamily:tk.fontD }}>{tr.noRecurring}</div><div className="text-xs mb-4" style={{ color:tk.MUTED }}>{tr.recurringHint}</div><button onClick={()=>setEditing({})} className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background:tk.EMERALD, color:tk.ON_EMERALD }}>+ {tr.newTemplate}</button></div>
          : <div className="space-y-2">{recurring.map(r=>{ const cat=getCat(r.category); const Icon=cat.icon; return (
            <div key={r.id} className="rounded-xl p-3 flex items-center gap-3" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:cat.color+'15' }}><Icon className="w-4 h-4" style={{ color:cat.color }}/></div>
              <div className="flex-1 min-w-0"><div className="text-sm font-semibold truncate" style={{ color:tk.INK }}>{r.note||(lang==='ar'?cat.ar:cat.fr)}</div><div className="text-[11px]" style={{ color:tk.MUTED }}>{tr.everyMonthDay} {r.dayOfMonth} · {fmtMAD(r.amount,lang)}</div></div>
              <button onClick={()=>setEditing(r)} className="p-2 rounded-lg" style={{ background:tk.BG_DEEP, color:tk.MUTED }}><Pencil className="w-3.5 h-3.5"/></button>
              <button onClick={()=>remove(r.id)} className="p-2 rounded-lg" style={{ background:tk.WARN, color:tk.TERRA }}><Trash2 className="w-3.5 h-3.5"/></button>
            </div>
          );})}
          </div>
        }
      </main>
      {editing&&<RecurringModal tr={tr} lang={lang} isRTL={isRTL} tokens={tokens} initial={editing.id?editing:null} onCancel={()=>setEditing(null)} onSave={save}/>}
    </>
  );
}

function RecurringModal({ tr, lang, isRTL, tokens, initial, onCancel, onSave }) {
  const tk=tokens;
  const [amt,setAmt]=useState(initial?.amount?.toString()||'');
  const [cat,setCat]=useState(initial?.category||null);
  const [note,setNote]=useState(initial?.note||'');
  const [dom,setDom]=useState(initial?.dayOfMonth||1);
  const can=amt&&parseFloat(amt)>0&&cat;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background:tk.OVERLAY }} onClick={onCancel}>
      <div className="w-full max-w-md rounded-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto" style={{ background:tk.BG, border:`1px solid ${tk.BORDER}` }} dir={isRTL?'rtl':'ltr'} onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between"><span style={{ fontFamily:tk.fontD, fontWeight:600, color:tk.INK }}>{initial?tr.manageRecurring:tr.newTemplate}</span><button onClick={onCancel} style={{ color:tk.MUTED }}><X className="w-4 h-4"/></button></div>
        <div className="rounded-xl p-4 space-y-3" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}` }}>
          <div><Label tk={tk} isRTL={isRTL}>{tr.templateName}</Label><input type="text" value={note} onChange={e=>setNote(e.target.value)} placeholder={lang==='ar'?'مثال: إيجار':'Ex : Loyer'} className="w-full bg-transparent outline-none text-sm font-semibold mt-1" style={{ color:tk.INK }}/></div>
          <Divider tk={tk}/>
          <div className="grid grid-cols-2 gap-3">
            <div><Label tk={tk} isRTL={isRTL}>{tr.amount}</Label><input type="number" inputMode="decimal" value={amt} onChange={e=>setAmt(e.target.value)} placeholder="0.00" className="w-full bg-transparent outline-none text-sm font-semibold mt-1" style={{ color:tk.INK, direction:'ltr', textAlign:isRTL?'right':'left', fontVariantNumeric:'tabular-nums' }}/></div>
            <div><Label tk={tk} isRTL={isRTL}>{tr.dayOfMonth}</Label><input type="number" min="1" max="28" value={dom} onChange={e=>setDom(Math.max(1,Math.min(28,parseInt(e.target.value)||1)))} className="w-full bg-transparent outline-none text-sm font-semibold mt-1" style={{ color:tk.INK, direction:'ltr', textAlign:isRTL?'right':'left', fontVariantNumeric:'tabular-nums' }}/></div>
          </div>
        </div>
        <div><Label tk={tk} isRTL={isRTL}>{tr.chooseCategory}</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {expenseCats().map(c=>{ const Icon=c.icon; const sel=cat===c.id; return (
              <button key={c.id} onClick={()=>setCat(c.id)} className="p-2.5 rounded-xl flex flex-col items-center gap-1" style={{ background:sel?c.color:tk.SURFACE, color:sel?'#FFFDF8':tk.INK, border:`1px solid ${sel?c.color:tk.BORDER}` }}>
                <Icon className="w-4 h-4"/><span className="text-[9px] font-semibold">{lang==='ar'?c.ar:c.fr}</span>
              </button>
            );})}
          </div>
        </div>
        <div className="flex gap-2"><button onClick={onCancel} className="flex-1 py-3 rounded-xl text-sm font-semibold" style={{ background:tk.BG_DEEP, color:tk.INK }}>{tr.cancel}</button><button onClick={()=>can&&onSave({id:initial?.id,type:'expense',category:cat,amount:parseFloat(amt),note,dayOfMonth:parseInt(dom),appliedMonths:initial?.appliedMonths??[]})} disabled={!can} className="flex-[2] py-3 rounded-xl text-sm font-semibold" style={{ background:can?tk.EMERALD:tk.MUTED, color:tk.ON_EMERALD, opacity:can?1:0.5 }}>{tr.save}</button></div>
      </div>
    </div>
  );
}

// ── Custom Category Modal ─────────────────────────────────
function CustomCatModal({ tr, lang, isRTL, tokens, type, onCancel, onSave }) {
  const tk=tokens;
  const [label,    setLabel]   = useState('');
  const [iconName, setIconName]= useState('Package');
  const [color,    setColor]   = useState(CUSTOM_COLORS[0]);
  const [rule,     setRule]    = useState('wants');
  const canSave = label.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    onSave({ id:uid('cc'), type, label:label.trim(), iconName, color, rule:type==='expense'?rule:undefined });
  };

  const iconEntries = Object.entries(ICON_MAP);
  const PreviewIcon = ICON_MAP[iconName] ?? Package;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background:tk.OVERLAY }} onClick={onCancel}>
      <div className="w-full max-w-md rounded-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto"
        style={{ background:tk.BG, border:`1px solid ${tk.BORDER}` }}
        dir={isRTL?'rtl':'ltr'} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between">
          <span style={{ fontFamily:tk.fontD, fontWeight:600, color:tk.INK }}>
            {lang==='ar'?'فئة جديدة':'Nouvelle catégorie'}
          </span>
          <button onClick={onCancel} style={{ color:tk.MUTED }}><X className="w-4 h-4"/></button>
        </div>

        {/* Name */}
        <div className="rounded-xl p-3" style={{ background:tk.SURFACE, border:`1px solid ${tk.BORDER}` }}>
          <Label tk={tk} isRTL={isRTL}>{lang==='ar'?'الاسم':'Nom'}</Label>
          <input type="text" value={label} onChange={e=>setLabel(e.target.value)} autoFocus
            placeholder={lang==='ar'?'مثال: قهوة، تأمين…':'Ex : Café, Assurance…'}
            className="w-full bg-transparent outline-none text-sm font-semibold mt-1.5"
            style={{ color:tk.INK }}/>
        </div>

        {/* Icon picker */}
        <div>
          <Label tk={tk} isRTL={isRTL}>{lang==='ar'?'الأيقونة':'Icône'}</Label>
          <div className="grid grid-cols-6 gap-2 mt-2 max-h-40 overflow-y-auto" style={{ scrollbarWidth:'none' }}>
            {iconEntries.map(([name, Icon])=>(
              <button key={name} onClick={()=>setIconName(name)}
                className="p-2.5 rounded-xl flex items-center justify-center"
                style={{ background:iconName===name?color:tk.SURFACE, border:`1px solid ${iconName===name?color:tk.BORDER}`, color:iconName===name?'#FFFDF8':tk.MUTED }}>
                <Icon className="w-4 h-4"/>
              </button>
            ))}
          </div>
        </div>

        {/* Color picker */}
        <div>
          <Label tk={tk} isRTL={isRTL}>{lang==='ar'?'اللون':'Couleur'}</Label>
          <div className="flex flex-wrap gap-2.5 mt-2">
            {CUSTOM_COLORS.map(c=>(
              <button key={c} onClick={()=>setColor(c)}
                className="w-8 h-8 rounded-full flex-shrink-0"
                style={{ background:c, outline:color===c?`3px solid ${tk.INK}`:'none', outlineOffset:'2px' }}/>
            ))}
          </div>
        </div>

        {/* Rule — expense only */}
        {type==='expense' && (
          <div>
            <Label tk={tk} isRTL={isRTL}>{lang==='ar'?'نوع المصروف':'Type de dépense'}</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[{id:'needs',ar:'ضروريات',fr:'Besoins'},{id:'wants',ar:'رغبات',fr:'Envies'}].map(r=>(
                <button key={r.id} onClick={()=>setRule(r.id)} className="py-2.5 rounded-xl text-xs font-bold"
                  style={{ background:rule===r.id?tk.EMERALD:tk.BG_DEEP, color:rule===r.id?tk.ON_EMERALD:tk.INK }}>
                  {lang==='ar'?r.ar:r.fr}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live preview */}
        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background:tk.BG_DEEP }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:color+'25' }}>
            <PreviewIcon className="w-5 h-5" style={{ color }}/>
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color:tk.INK }}>{label||'…'}</div>
            <div className="text-[10px]" style={{ color:tk.MUTED }}>
              {type==='expense'?(lang==='ar'?'مصروف':'Dépense'):(lang==='ar'?'دخل':'Revenu')}
              {type==='expense'?' · '+(rule==='needs'?(lang==='ar'?'ضروري':'Besoin'):(lang==='ar'?'رغبة':'Envie')):''}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{ background:tk.BG_DEEP, color:tk.INK }}>{tr.cancel}</button>
          <button onClick={handleSave} disabled={!canSave} className="flex-[2] py-3 rounded-xl text-sm font-semibold"
            style={{ background:canSave?color:tk.MUTED, color:'#FFFDF8', opacity:canSave?1:0.5 }}>
            {lang==='ar'?'إنشاء الفئة':'Créer la catégorie'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Util
function download(blob, name) { const u=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=u; a.download=name; a.click(); URL.revokeObjectURL(u); }
