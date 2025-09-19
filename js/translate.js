const translatePage = async (language) => {
    try {
        const response = await fetch(`assets/lang/${language}.json`);
        if (!response.ok) {
            console.error(`Could not load language file: ${language}.json`);
            return;
        }
        const langData = await response.json();

        // Translate text content
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (langData[key]) element.textContent = langData[key];
        });

        // Translate placeholders
        document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
            const key = element.getAttribute('data-lang-placeholder');
            if (langData[key]) element.placeholder = langData[key];
        });

    } catch (error) {
        console.error('Error translating page:', error);
    }
};

const changeLanguage = (language) => {
    localStorage.setItem('userLanguage', language);

    translatePage(language);
};

document.addEventListener('DOMContentLoaded', () => {
    const userLanguage = localStorage.getItem('userLanguage') || 'en';
    translatePage(userLanguage);
});