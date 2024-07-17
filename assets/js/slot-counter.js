function getNextThursday() {
    const now = new Date();
    const nextThursday = new Date(now);
    nextThursday.setDate(now.getDate() + ((4 + 7 - now.getDay()) % 7));
    nextThursday.setHours(12, 0, 0, 0); // Set to noon ET
    if (now > nextThursday) {
        nextThursday.setDate(nextThursday.getDate() + 7);
    }
    return nextThursday;
}

function generateWeeklyPattern(seed) {
    const pattern = [];
    let remainingSlots = 5 + (seed % 5); // Start with 5-9 slots
    const daysInWeek = 7;
    
    for (let i = 0; i < daysInWeek; i++) {
        pattern.push(remainingSlots);
        if (remainingSlots > 3 && i < daysInWeek - 1) {
            const maxDecrease = Math.min(remainingSlots - 3, Math.ceil((remainingSlots - 3) / (daysInWeek - i - 1)));
            if (Math.random() < 0.7) { // 70% chance to decrease
                remainingSlots -= Math.floor(Math.random() * maxDecrease) + 1;
            }
        }
    }
    return pattern;
}

let lastDays, lastHours, lastMinutes, lastSeconds;

function updateCountdown() {
    const now = new Date();
    const endTime = getNextThursday();
    const timeLeft = endTime - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (days !== lastDays) {
        document.querySelectorAll('.Days').forEach(el => {
            if (el.textContent !== days.toString().padStart(2, '0')) {
                el.textContent = days.toString().padStart(2, '0');
            }
        });
        lastDays = days;
    }
    if (hours !== lastHours) {
        document.querySelectorAll('.Hours').forEach(el => {
            if (el.textContent !== hours.toString().padStart(2, '0')) {
                el.textContent = hours.toString().padStart(2, '0');
            }
        });
        lastHours = hours;
    }
    if (minutes !== lastMinutes) {
        document.querySelectorAll('.Minutes').forEach(el => {
            if (el.textContent !== minutes.toString().padStart(2, '0')) {
                el.textContent = minutes.toString().padStart(2, '0');
            }
        });
        lastMinutes = minutes;
    }
    if (seconds !== lastSeconds) {
        document.querySelectorAll('.Seconds').forEach(el => {
            if (el.textContent !== seconds.toString().padStart(2, '0')) {
                el.textContent = seconds.toString().padStart(2, '0');
            }
        });
        lastSeconds = seconds;
    }
}

function updateSlotCount() {
    const now = new Date();
    const startOfWeek = getNextThursday();
    startOfWeek.setDate(startOfWeek.getDate() - 7); // Go back to last Thursday
    
    const daysSinceStart = Math.floor((now - startOfWeek) / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor((startOfWeek - new Date(startOfWeek.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
    
    const seed = weekNumber + startOfWeek.getFullYear();
    const weekPattern = generateWeeklyPattern(seed);
    const slotCount = weekPattern[daysSinceStart];

    const nextThursday = getNextThursday();
    const daysLeft = Math.ceil((nextThursday - now) / (1000 * 60 * 60 * 24));

    document.querySelectorAll('.slot-count').forEach(el => {
        if (el.textContent != slotCount) {
            el.textContent = slotCount;
        }
    });

    document.querySelectorAll('.time-frame').forEach(el => {
        const newText = daysLeft === 1 ? 'today' : `in the next ${daysLeft} days`;
        if (el.textContent != newText) {
            el.textContent = newText;
        }
    });

    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const progress = ((9 - slotCount) / 6) * 100; // 9 is max, 3 is min
        progressBar.style.width = `${progress}%`;
    }
}

function initializeCounters() {
    updateSlotCount();
    updateCountdown();
    
    setInterval(updateCountdown, 1000);
    setInterval(updateSlotCount, 60 * 60 * 1000);
    
    const now = new Date();
    const nextThursday = getNextThursday();
    const timeUntilReset = nextThursday - now;
    setTimeout(() => {
        location.reload();
    }, timeUntilReset);
}

document.addEventListener('DOMContentLoaded', initializeCounters);
