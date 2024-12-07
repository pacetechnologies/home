// Utility to safely select elements
const select = (selector) => document.querySelector(selector);

// Function to get a dynamic greeting based on time, day, and special events
function getDynamicGreeting() {
    const now = new Date();
    const hours = now.getHours();
    const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' });
    const month = now.getMonth() + 1; // Months are zero-indexed
    const date = now.getDate();

    // Determine time-based greeting with humor
    const timeGreeting = getTimeGreeting(hours);

    // Fun and edgy day-of-week phrases
    const dayPhrases = {
        Monday: "Mondays suck, but here we are. Let’s do this!",
        Tuesday: "It's Tuesday—pretend you're productive.",
        Wednesday: "Happy Hump Day! The weekend is so close, yet so far.",
        Thursday: "Thursday... basically Friday's awkward cousin.",
        Friday: "It's Friday! Time to half-ass the day and call it 'effort.'",
        Saturday: "It's Saturday. Pants are optional.",
        Sunday: "Sunday Funday... or existential dread day. You choose.",
    };

    // Special event greetings
    const specialEvents = {
        '12-25': 'Merry Christmas! 🎄 Time to argue over politics at dinner.',
        '1-1': 'Happy New Year! 🎉 Resolutions are overrated anyway.',
        '7-4': 'Happy Independence Day! 🎆 Let’s blow something up responsibly.',
        '12-24': '🎂 Happy Birthday, Marc! 🎂 Another year closer to immortality.',
    };

    // Random funny facts or quips
    const funFacts = [
        "Did you know? Honey never spoils... unlike your mood on Mondays.",
        "Pro tip: Take a deep breath... and scream into the void.",
        "Fun fact: Bananas are berries. The world makes no sense.",
        "Reminder: Hydrate before you caffeinate. Or don’t, I’m not your mom.",
        "Quote: 'You miss 100% of the naps you don’t take.' - Definitely Wayne Gretzky.",
        "Fact: The Eiffel Tower can be taller in summer, unlike your patience.",
        "Motivation: 'You’ve got this!' (Probably. No guarantees.)",
    ];
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

    // Determine the event or day-specific greeting
    const eventGreeting = specialEvents[`${month}-${date}`] || dayPhrases[dayOfWeek] || '';

    // Return the parts as an object for easier rendering
    return { timeGreeting, eventGreeting, randomFact };
}

// Helper function to get a humorous greeting based on the time of day
function getTimeGreeting(hours) {
    if (hours < 6) return "Why are you even awake? Go back to bed.";
    if (hours < 12) return "Good morning, Marc!";
    if (hours < 18) return "Good afternoon, Marc!";
    if (hours < 22) return "Good evening, Marc!";
    return "Still awake? This is how villains are made.";
}

// Function to update the greeting on the homepage
function updateGreeting() {
    const { timeGreeting, eventGreeting, randomFact } = getDynamicGreeting();

    select('.header .main-greeting').textContent = timeGreeting;
    select('.header .sub-greeting').textContent = eventGreeting;
    select('.header .fun-fact').textContent = randomFact;
}

// Function to make link cards clickable and interactive
function enableClickableLinks() {
    document.querySelectorAll('.link-card').forEach((card) => {
        card.addEventListener('click', () => {
            const link = card.getAttribute('data-link');
            if (link) window.open(link, '_blank'); // Opens the link in a new tab
        });
    });
}

// Function to display current date and time
function updateDateTime() {
    const now = new Date();

    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

    select('.current-date').textContent = `Date: ${now.toLocaleDateString('en-US', optionsDate)}`;
    select('.local-time').textContent = `Time: ${now.toLocaleTimeString('en-US', optionsTime)}`;
}

// Function to fetch and display weather data
async function updateWeather() {
    const weatherElement = select('.local-weather');
    const apiKey = 'InsertYourAPIKeyHere'; // Replace with your OpenWeatherMap API Key
    const city = 'Tucson';
    const units = 'imperial'; // Use 'metric' for Celsius

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
        );
        const data = await response.json();

        if (data.weather && data.main) {
            const description = data.weather[0].description;
            const temp = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like);

            weatherElement.textContent = `Weather: ${description}, ${temp}°F (Feels like: ${feelsLike}°F)`;
        } else {
            weatherElement.textContent = 'Weather: Unable to fetch data.';
        }
    } catch (error) {
        console.error('Weather fetch error:', error);
        weatherElement.textContent = 'Weather: Unable to fetch data.';
    }
}

// Function to initialize dynamic content
function initializeDynamicContent() {
    updateGreeting();
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update time every second
    updateWeather();
    enableClickableLinks();
}

// Run dynamic content updates when the page loads
document.addEventListener('DOMContentLoaded', initializeDynamicContent);

// Toggle Light Mode
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'dark' : 'light');
}

// Initialize Theme Based on Local Storage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
}