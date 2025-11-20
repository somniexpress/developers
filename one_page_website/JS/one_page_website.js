// one_page_website.js

document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close">&times;</span>
            <img class="lightbox-img" src="" alt="">
            <div class="lightbox-caption"></div>
            <div class="lightbox-nav">
                <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
                <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;
    
    // Add lightbox to the page
    document.body.appendChild(lightbox);
    
    // Add lightbox styles
    const lightboxStyles = `
        #lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 1000;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        #lightbox.active {
            display: flex;
            opacity: 1;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .lightbox-img {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
        }
        
        .close {
            position: absolute;
            top: -40px;
            right: -10px;
            color: white;
            font-size: 35px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.3s;
        }
        
        .close:hover {
            color: #3498db;
        }
        
        .lightbox-caption {
            color: white;
            text-align: center;
            margin-top: 15px;
            font-size: 18px;
            max-width: 80%;
        }
        
        .lightbox-nav {
            position: absolute;
            top: 50%;
            width: 100%;
            display: flex;
            justify-content: space-between;
            transform: translateY(-50%);
        }
        
        .prev-btn, .next-btn {
            background: rgba(52, 152, 219, 0.7);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .prev-btn:hover, .next-btn:hover {
            background: rgba(52, 152, 219, 1);
            transform: scale(1.1);
        }
        
        .prev-btn {
            margin-left: 20px;
        }
        
        .next-btn {
            margin-right: 20px;
        }
        
        @media (max-width: 768px) {
            .prev-btn, .next-btn {
                width: 40px;
                height: 40px;
                font-size: 16px;
            }
            
            .lightbox-caption {
                font-size: 16px;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = lightboxStyles;
    document.head.appendChild(styleSheet);
    
    // Get all gallery images
    const galleryImages = document.querySelectorAll('.gallery-item img');
    let currentImageIndex = 0;
    
    // Add click event to each gallery image
    galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openLightbox(index);
        });
    });
    
    // Lightbox functions
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    function updateLightboxImage() {
        const lightboxImg = document.querySelector('.lightbox-img');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const currentImg = galleryImages[currentImageIndex];
        
        lightboxImg.src = currentImg.src;
        lightboxImg.alt = currentImg.alt;
        
        // Get caption from the gallery item
        const captionElement = currentImg.closest('.gallery-item').querySelector('.gallery-caption h3');
        lightboxCaption.textContent = captionElement ? captionElement.textContent : '';
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    }
    
    // Event listeners for lightbox controls
    document.querySelector('.close').addEventListener('click', closeLightbox);
    document.querySelector('.next-btn').addEventListener('click', showNextImage);
    document.querySelector('.prev-btn').addEventListener('click', showPrevImage);
    
    // Close lightbox when clicking on the background
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
        }
    });
    
    // Add form submission handler
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this example, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been sent. We'll get back to you at ${email} soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
});