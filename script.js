
    const emojis = [
      "🐰", "🐱", "🦌", "🐻",
      "🐸", "🐼", "🐰", "🐱",
      "🦌", "🐻", "🐸", "🐼"
    ];

    const game = document.getElementById("game");
    const movesText = document.getElementById("moves");
    const timeText = document.getElementById("time");
    const message = document.getElementById("message");

    let firstCard = null;
    let secondCard = null;
    let moves = 0;
    let matched = 0;
    let seconds = 0;
    let locked = false;
    let timer = null;
    let started = false;

    function startGame() {
      clearInterval(timer);

      firstCard = null;
      secondCard = null;
      moves = 0;
      matched = 0;
      seconds = 0;
      locked = false;
      started = false;

      movesText.textContent = 0;
      timeText.textContent = 0;
      message.textContent = "";
      game.innerHTML = "";

      const shuffled = [...emojis].sort(
        () => Math.random() - 0.5
      );

      shuffled.forEach((emoji) => {
        const card = document.createElement("button");

        card.className = "card";
        card.textContent = "?";
        card.dataset.emoji = emoji;
        card.setAttribute("aria-label", "Kartu tertutup");

        card.addEventListener("click", () => flipCard(card));

        game.appendChild(card);
      });
    }

    function flipCard(card) {
      if (
        locked ||
        card.classList.contains("open") ||
        card.classList.contains("matched")
      ) {
        return;
      }

      if (!started) {
        started = true;

        timer = setInterval(() => {
          seconds++;
          timeText.textContent = seconds;
        }, 1000);
      }

      card.textContent = card.dataset.emoji;
      card.classList.add("open");
      card.setAttribute("aria-label", card.dataset.emoji);

      if (firstCard === null) {
        firstCard = card;
        return;
      }

      secondCard = card;
      moves++;
      movesText.textContent = moves;

      if (
        firstCard.dataset.emoji === secondCard.dataset.emoji
      ) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matched += 2;
        firstCard = null;
        secondCard = null;

        if (matched === emojis.length) {
          clearInterval(timer);
          message.textContent =
            `You win! ♡ ${moves} moves, ${seconds} seconds!`;
        }
      } else {
        locked = true;

        setTimeout(() => {
          firstCard.textContent = "?";
          secondCard.textContent = "?";

          firstCard.classList.remove("open");
          secondCard.classList.remove("open");

          firstCard.setAttribute("aria-label", "Kartu tertutup");
          secondCard.setAttribute("aria-label", "Kartu tertutup");

          firstCard = null;
          secondCard = null;
          locked = false;
        }, 800);
      }
    }

    document.getElementById("restart")
      .addEventListener("click", startGame);

    startGame();