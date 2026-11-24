/**
 * Little Flower School, Hajipur
 * Official Website JavaScript
 * Motto: "Learning Today for Leading Tomorrow"
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStickyHeader();
  initGalleryFilterAndLightbox();
  initAdmissionsForm();
  initScrollTop();
});

/* ==========================================================================
   1. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const navLinks = document.querySelectorAll('.mobile-nav-links .nav-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function toggleMenu() {
    toggleBtn.classList.toggle('active');
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenu() {
    toggleBtn.classList.remove('active');
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   2. STICKY HEADER & ACTIVE NAV LINK
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      header.classList.remove('scrolled');
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.06)';
    }
  });
}

/* ==========================================================================
   3. GALLERY FILTER & LIGHTBOX MODAL
   ========================================================================== */
function initGalleryFilterAndLightbox() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  
  // Filter Functionality
  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // Lightbox Functionality
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentImages = [];
    let currentIndex = 0;

    function updateCurrentImageList() {
      currentImages = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    }

    function openLightbox(index) {
      updateCurrentImageList();
      if (currentImages.length === 0) return;

      currentIndex = index;
      const targetItem = currentImages[currentIndex];
      const img = targetItem.querySelector('img');
      const title = targetItem.querySelector('.gallery-caption-title')?.textContent || '';

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = title;

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function showNext() {
      updateCurrentImageList();
      if (currentImages.length === 0) return;
      currentIndex = (currentIndex + 1) % currentImages.length;
      openLightbox(currentIndex);
    }

    function showPrev() {
      updateCurrentImageList();
      if (currentImages.length === 0) return;
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      openLightbox(currentIndex);
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        updateCurrentImageList();
        const activeIndex = currentImages.indexOf(item);
        openLightbox(activeIndex !== -1 ? activeIndex : index);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  }
}

/* ==========================================================================
   4. ADMISSIONS ENQUIRY FORM & WHATSAPP FORWARDING
   ========================================================================== */
function initAdmissionsForm() {
  const form = document.getElementById('admissions-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const parentName = document.getElementById('parent-name')?.value.trim();
    const studentName = document.getElementById('student-name')?.value.trim();
    const grade = document.getElementById('grade-apply')?.value;
    const phone = document.getElementById('phone-number')?.value.trim();
    const message = document.getElementById('enquiry-message')?.value.trim() || 'Interested in Little Flower School Admission';

    if (!parentName || !studentName || !phone) {
      alert('Please fill in all required fields (Parent Name, Student Name, and Phone Number).');
      return;
    }

    // Prepare WhatsApp Message
    const schoolPhone = '919110959937';
    const waText = encodeURIComponent(
      `*New Admission Enquiry - Little Flower School*\n\n` +
      `*Parent Name:* ${parentName}\n` +
      `*Student Name:* ${studentName}\n` +
      `*Grade Applying For:* ${grade}\n` +
      `*Contact Phone:* ${phone}\n` +
      `*Message/Note:* ${message}\n\n` +
      `_Sent via Little Flower School Website_`
    );

    // Show Confirmation Dialog
    const sendWhatsApp = confirm(
      `Thank you, ${parentName}!\n\n` +
      `Your admission enquiry for ${studentName} (${grade}) has been received.\n\n` +
      `Click OK to also forward this directly to Little Flower School Hajipur on WhatsApp (+91 91109 59937) for priority response!`
    );

    if (sendWhatsApp) {
      window.open(`https://wa.me/${schoolPhone}?text=${waText}`, '_blank');
    }

    form.reset();
  });
}

/* ==========================================================================
   5. SCROLL TO TOP
   ========================================================================== */
function initScrollTop() {
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
