# محاسبي – Mes Comptes
## دليل بناء تطبيق APK

---

## ما تحتاجه (مرة واحدة فقط)

### 1. Node.js
- اذهب إلى: https://nodejs.org
- حمّل النسخة LTS وثبّتها

### 2. Android Studio
- اذهب إلى: https://developer.android.com/studio
- حمّل وثبّت Android Studio
- عند التثبيت، تأكد من تحديد **Android SDK** و **Android Virtual Device**

---

## خطوات بناء APK

### الخطوة 1 — افتح Terminal (أو Command Prompt في Windows)
اذهب إلى مجلد المشروع:
```
cd mes-comptes
```

### الخطوة 2 — ثبّت الحزم (مرة واحدة فقط)
```
npm install
```

### الخطوة 3 — ابنِ التطبيق وزامنه مع Android
```
npm run build
npx cap sync android
```

### الخطوة 4 — افتح Android Studio
```
npx cap open android
```

### الخطوة 5 — في Android Studio
1. انتظر حتى تنتهي مزامنة Gradle (شريط التقدم في الأسفل)
2. من القائمة: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
3. انتظر قليلاً
4. سيظهر إشعار "APK(s) generated" → انقر **locate**
5. ملف APK موجود في:
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

### الخطوة 6 — نقل APK إلى الهاتف
- انسخ الملف إلى هاتفك عبر USB أو أرسله واتساب لنفسك
- افتح الملف على الهاتف لتثبيته
- ⚠️ قد يطلب منك تفعيل "تثبيت من مصادر غير معروفة" في الإعدادات

---

## إذا أردت تغيير أي شيء في التطبيق
1. عدّل ملف `src/App.jsx`
2. أعِد تشغيل:
   ```
   npm run build
   npx cap sync android
   ```
3. في Android Studio: **Build → Build APK(s)**

---

## هيكل المشروع
```
mes-comptes/
├── src/
│   ├── App.jsx          ← كود التطبيق كاملاً (هنا تعدّل)
│   └── main.jsx         ← نقطة الدخول
├── android/             ← مشروع Android (لا تعدّله يدوياً)
├── public/
│   ├── manifest.json    ← إعدادات PWA
│   └── sw.js            ← Service Worker
├── capacitor.config.json← إعدادات Capacitor
├── package.json
└── vite.config.js
```

---

## مشاكل شائعة

**خطأ JAVA_HOME:**
Android Studio يحتاج Java — عادةً يثبّته تلقائياً.
إذا ظهر خطأ، افتح Android Studio أولاً وأكمل الإعداد.

**Gradle sync failed:**
في Android Studio: **File → Sync Project with Gradle Files**

**"تثبيت التطبيقات غير معروفة المصدر":**
اذهب إلى إعدادات الهاتف → الأمان → فعّل "السماح بمصادر غير معروفة"
(أو ابحث عن "install unknown apps" في الإعدادات)

---

صُنع بالمغرب · Fait au Maroc 🇲🇦
