
/* -----------------------------------------------------------
   1. SETTINGS SIDEBAR (فتح وقفل قائمة الإعدادات)
----------------------------------------------------------- */
const sidebar = document.getElementById('settings-sidebar');
const toggleBtn = document.getElementById('settings-toggle');
const closeBtn = document.getElementById('close-settings');

let isOpen = false;

// وظيفة فتح السايد بار
function openSidebar() {
    sidebar.classList.remove('translate-x-full');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.classList.add('hidden');
    isOpen = true;
}
// وظيفة قفل السايد بار
function closeSidebar() {
    sidebar.classList.add('translate-x-full');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.classList.remove('hidden');
    isOpen = false;
}
// تبديل حالة السايد بار عند الضغط على الزرار الرئيسي
toggleBtn.addEventListener('click', () => {
    if (isOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
});
// قفل السايد بار عند الضغط على زرار الإغلاق (X)
closeBtn.addEventListener('click', closeSidebar);
// قفل السايد بار عند الضغط في أي مكان خارج السايد بار والزرار
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeSidebar();
    }
});


/* -----------------------------------------------------------
   2. SCROLL TO TOP & SCROLL SPY (زر الصعود ومراقبة الأقسام)
----------------------------------------------------------- */
const scrollBtn = document.getElementById('scroll-to-top');
let AllSection = document.querySelectorAll('section');
let AllLinks = document.querySelectorAll('nav a');
// وظيفة مراقبة السكرول لإظهار زر الصعود وتشغيل الـ ScrollSpy
window.addEventListener('scroll', () => {
    scrollSpy();

    if (window.scrollY > 300) {
        scrollBtn.classList.remove('opacity-0', 'invisible');
        scrollBtn.classList.add('opacity-100', 'visible');
    } else {
        scrollBtn.classList.add('opacity-0', 'invisible');
        scrollBtn.classList.remove('opacity-100', 'visible');
    }
});

// العودة لأعلى الصفحة عند الضغط على الزرار

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// وظيفة الـ ScrollSpy لتحديد اللينك النشط بناءً على مكانك في الصفحة
function scrollSpy() {
    let targetSection;
    for (let i = 0; i < AllSection.length; i++) {
        if (window.scrollY >= AllSection[i].offsetTop - 100) {
            targetSection = AllSection[i].getAttribute("id");
        }
    }
    for (let i = 0; i < AllLinks.length; i++) {
        if (AllLinks[i].getAttribute("href") == `#${targetSection}`) {
            AllLinks[i].classList.add("active");
        } else {
            AllLinks[i].classList.remove("active");
        }
    }
}

// تشغيل الـ ScrollSpy عند الضغط على لينكات الناف بار (Smooth Scroll)
AllLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
        scrollSpy();
    });
});

// تشغيل الـ ScrollSpy بمجرد تحميل الصفحة أو إعادة تحميلها
window.addEventListener('load', scrollSpy);
scrollSpy();


/* -----------------------------------------------------------
   3. DARK MODE SYSTEM (نظام الوضع الليلي وحفظه)
----------------------------------------------------------- */

// التحقق من الثيم المحفوظ عند فتح الموقع لأول مرة
if (localStorage.getItem("mode")) {
    if (localStorage.getItem("mode") == "dark") {
        document.querySelector('html').classList.add("dark");
    } else {
        document.querySelector('html').classList.remove("dark");
    }
} else {
    // الوضع الافتراضي إذا لم يسبق للمستخدم الاختيار
    localStorage.setItem("mode", "dark");
}

// تبديل الوضع (Dark/Light) وحفظه في الـ LocalStorage
document.getElementById("theme-toggle-button").addEventListener("click", function () {
    document.querySelector('html').classList.toggle("dark");

    if (localStorage.getItem("mode") == "dark") {
        localStorage.setItem("mode", "light");
    } else {
        localStorage.setItem("mode", "dark");
    }
});


/* -----------------------------------------------------------
   4. FONT SYSTEM (نظام تغيير الخطوط وحفظ الاختيار)
----------------------------------------------------------- */
const fonts = document.querySelectorAll('.font-option');

// وظيفة تطبيق الخط وحفظه في الذاكرة
function setFont(fontName) {
    document.documentElement.style.setProperty("--selected-font", fontName);
    localStorage.setItem("user-font", fontName);
    updateActiveB(fontName);
}

// وظيفة تحديث شكل الأزرار (Active State) بناءً على الخط المختار

function updateActiveB(activeFont) {
    fonts.forEach(f => {
        if (f.dataset.font === activeFont) {
            f.classList.add("active");
            f.setAttribute("aria-checked", true);
        } else {
            f.classList.remove("active");
            f.setAttribute("aria-checked", false);
        }
    });
}

// إضافة حدث الضغط لكل زرار من خيارات الخطوط

fonts.forEach(font => {
    font.addEventListener("click", function () {
        setFont(this.dataset.font);
    });
});

// استعادة الخط المحفوظ وتطبيقه فور تحميل محتوى الصفحة

window.addEventListener('DOMContentLoaded', () => {
    const savedFont = localStorage.getItem('user-font') || 'Tajawal';
    updateActiveB(savedFont);
    document.documentElement.style.setProperty('--selected-font', savedFont);
});


//theme colors

  const themes = {
  blue: {
    primary: "#2563eb",   
    secondary: "#60a5fa", 
    accent: "#1d4ed8",    
    slate: "#1e293b"      
  },
  green: {
    primary: "#22c55e",   
    secondary: "#4ade80",
    accent: "#15803d",    
    slate: "#064e3b"
  },
  purple: {
    primary: "#9333ea",  
    secondary: "#c084fc", 
    accent: "#7e22ce",    
    slate: "#2e1065"  
  },
  orange: {
    primary: "#f59e0b", 
    secondary: "#ea580c", 
    accent: "#ef4444", 
    slate: "#1c140f" 
}
};

const grid = document.getElementById("theme-colors-grid");


Object.entries(themes).forEach(([name, colors]) => {
  const circle = document.createElement("button");
  circle.className = "w-10 h-10 rounded-full cursor-pointer border-0.5 border-transparent transition-all duration-300 hover:scale-110 shadow-lg";
  if (name === "orange") {
    circle.style.background = colors.primary;
  } else {
    circle.style.backgroundColor = colors.primary;
  }

  circle.setAttribute("data-theme", name);

  circle.addEventListener("click", (e) => {
    setTheme(name);
    updateActiveClass(circle);
  });
  grid.appendChild(circle);
});

function setTheme(themeName) {
  const root = document.documentElement;
  const theme = themes[themeName];
  if (theme) {
    root.style.setProperty("--color-primary", theme.primary);
    root.style.setProperty("--color-secondary", theme.secondary);
    root.style.setProperty("--color-accent", theme.accent);
    root.style.setProperty("--color-slate", theme.slate);
    localStorage.setItem("portfolio-theme", themeName);
  }
}

function updateActiveClass(activeBtn) {
  document.querySelectorAll("#theme-colors-grid button").forEach((btn) => {
    btn.classList.remove("ring-4", "ring-offset-2", "ring-blue-400", "dark:ring-offset-slate-900");
  });
  activeBtn.classList.add("ring-4", "ring-offset-2", "ring-blue-400", "dark:ring-offset-slate-900");
}

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("portfolio-theme") || "blue";
  setTheme(savedTheme);
  const activeCircle = document.querySelector(`[data-theme="${savedTheme}"]`);
  if (activeCircle) updateActiveClass(activeCircle);
});