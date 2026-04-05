
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


const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.getElementById('menu-overlay');
    
    function toggleMenu() {
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        menuToggle.innerHTML = isExpanded ? 
            '<i class="fa-solid fa-xmark text-2xl text-slate-700 dark:text-slate-300"></i>' : 
            '<i class="fa-solid fa-bars text-2xl text-slate-700 dark:text-slate-300"></i>';
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // إغلاق القائمة عند الضغط على overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMenu);
    }
    
    // إغلاق القائمة عند الضغط على أي رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // إغلاق القائمة عند تغيير حجم النافذة
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
    
 let AllBtnFilter = document.querySelectorAll("#portfolio-filters button");

for (let i = 0; i < AllBtnFilter.length; i++) {
    AllBtnFilter[i].addEventListener("click", function(e) {
        // 1. منع الأكشن الأصلي
        e.preventDefault(); 
        
        // 2. تثبيت السكرول في مكانه الحالي عشان الصفحة متهزش
        let currentScroll = window.scrollY;

        let allCardPort = document.querySelectorAll(".portfolio-item");
        let category = this.getAttribute("data-filter");

        // تغيير الـ Classes
        AllBtnFilter.forEach(btn => btn.classList.remove("active", "bg-linear-to-r", "from-primary", "to-secondary"));
        this.classList.add("active", "bg-linear-to-r", "from-primary", "to-secondary");

        // الفلترة
        allCardPort.forEach(card => {
            card.style.opacity = "0";
            card.style.transform = "scale(0.8)";
            
            setTimeout(() => {
                card.style.display = "none";
                if (card.getAttribute("data-category") == category || category == "all") {
                    card.style.display = "block";
                    // إجبار المتصفح يفضل في مكانه بعد ما الطول اتغير
                    window.scrollTo(0, currentScroll); 
                    
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                }
            }, 300);
        });
    });
}
if(AllBtnFilter.length > 0) {
    AllBtnFilter[0].click();
}
let widthCard = document.querySelector(".testimonial-card").offsetWidth
let index =0

document.getElementById("next-testimonial").addEventListener("click", function(){
    index++
    if(index==4){
    index=0
}
    updateCaro()
})
function updateCaro(){
document.getElementById("testimonials-carousel").style.transform=`translateX(${widthCard*index}px)`
}
document.getElementById("prev-testimonial").addEventListener("click", function(){
    index--
    if(index<0){
    index=3
}
    updateCaro()
})

let allIndicators = document.querySelectorAll(".carousel-indicator")

for (let i = 0; i < allIndicators.length; i++) {
    allIndicators[i].addEventListener("click" , function(){
        index=i
        updateCaro()
    })
    
}

// بنجيب كل النقط
const indicators = document.querySelectorAll('.carousel-indicator');

indicators.forEach(dot => {
    dot.addEventListener('click', function() {
        // 1. تنظيف الكل (ترجيعهم للحالة المطفية)
        indicators.forEach(i => {
            i.style.backgroundColor = ""; // بيشيل أي لون يدوي
            i.classList.remove('bg-accent', 'scale-125');
            i.classList.add('bg-slate-400');
            i.setAttribute('aria-selected', 'false');
        });

        // 2. تشغيل اللي اتداس عليه (Active)
        this.classList.remove('bg-slate-400');
        this.classList.add('bg-accent', 'scale-125');
        this.setAttribute('aria-selected', 'true');
        
        // تأكيد باللون اليدوي لو الكلاس معلق
        this.style.backgroundColor = "var(--color-accent)"; 
    });
});