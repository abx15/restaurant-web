// Mobile Menu Toggle (Navigation bar mobile view ke liye)

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active'); 
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');   
    icon.classList.toggle('fa-times');
});


// Smooth Scrolling (Page ke kisi section pe smoothly scroll karna)

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,  
                behavior: 'smooth'
            });

            // Mobile menu ko close bhi kar do
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});



//  Sticky Navbar (Scroll pe navbar chipak jaaye top pe)

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');  
    } else {
        navbar.classList.remove('scrolled'); 
    }
});


// Menu Filter (Buttons se item filter karna e.g. Breakfast/Lunch)

const categoryBtns = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active class set karo
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;

        menuItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});


//  Add to Cart (Add to Order button ka effect)

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const menuItem = btn.closest('.menu-item');
        const itemName = menuItem.querySelector('h3').textContent;

        showNotification(`${itemName} added to your order!`);

        btn.textContent = 'Added!';
        btn.style.backgroundColor = '#4CAF50';

        setTimeout(() => {
            btn.textContent = 'Add to Order';
            btn.style.backgroundColor = '';
        }, 2000);
    });
});



// Form Submission (Reservation, Newsletter, Contact)

function handleForm(selector, successMessage, logLabel) {
    const form = document.querySelector(selector);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        console.log(logLabel, data);
        showNotification(successMessage);
        form.reset();
    });
}

handleForm('#reservation-form', 'Reservation confirmed!', 'Reservation Data:');
handleForm('.newsletter-form', 'Thanks for subscribing!', 'Newsletter Email:');
handleForm('.contact-form', 'Message sent successfully!', 'Contact Data:');


// Notification Show Function (screen pe message dikhana)

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


//  Scroll Animation (Jab element screen me aaye to animation ho)

function animateOnScroll() {
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight - 100) {
            element.classList.add('animated');
        }
    });
}
window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); 

// Notification ke liye Basic CSS (JavaScript se hi add kiya gaya)

const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
.notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1000;
}
.notification.show {
  opacity: 1;
}
`;
document.head.appendChild(notificationStyle);
