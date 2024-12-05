// Select the toggle button
const themeToggleBtn = document.getElementById("theme-toggle");

// Check and apply saved theme from localStorage
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
        themeToggleBtn.textContent = "Light Mode";
    }
}

// Event listener for the toggle button
themeToggleBtn.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        themeToggleBtn.textContent = "Dark Mode";
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeToggleBtn.textContent = "Light Mode";
    }
});

