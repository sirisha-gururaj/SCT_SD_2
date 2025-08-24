import React, { useState, useEffect, useRef } from "react";

const fadeInAnimation = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes glow {
  0%, 100% { text-shadow: 0 0 4px #f59e0b, 0 0 10px #fbbf24; }
  50% { text-shadow: 0 0 8px #f59e0b, 0 0 20px #fbbf24; }
}
`;

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(120deg, #7f53ac 0%, #647dee 100%)",
    backgroundSize: "cover",
    minHeight: "100vh",
    width: "100vw",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "2.75rem",
    fontWeight: 600,
    marginBottom: "1.1rem",
    color: "#f3f3fc",
    textShadow: "0 3px 14px #52217939",
    letterSpacing: "1px",
    textAlign: "center",
  },
  message: {
    fontSize: "1.3rem",
    marginBottom: "2rem",
    color: "#ecddfa",
    minHeight: "28px",
    animation: "fadeIn 0.4s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 600,
    letterSpacing: "0.5px",
    textAlign: "center",
  },
  messageShake: { animation: "shake 0.4s" },
  messagePulse: {
    color: "#30f2af",
    animation: "pulse 1.2s infinite",
  },
  low: {
    color: "#3b82f6",
    animation: "glow 2s infinite",
  },
  high: {
    color: "#ef4444",
    animation: "glow 2s infinite",
  },
  inputArea: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "1.5rem",
    width: "320px",
    maxWidth: "90vw",
  },
  input: {
    background: "rgba(31, 41, 55, 0.85)",
    color: "#fff",
    textAlign: "center",
    fontSize: "1.2rem",
    padding: "0.8rem 1.2rem",
    borderRadius: "0.7rem",
    border: "2px solid #817cc4",
    outline: "none",
    flexGrow: 1,
    boxSizing: "border-box",
    transition: "border-color 0.3s",
  },
  button: {
    color: "#f3f3fc",
    fontWeight: 600,
    padding: "0.85rem 2.1rem",
    borderRadius: "0.7rem",
    fontSize: "1.17rem",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(120deg, #30f2af, #647dee)", // changed to play again style
    boxShadow: "0 4px 18px rgba(48, 242, 175, 0.45)",
    transition: "transform 0.2s, background 0.3s",
    outline: "none",
    userSelect: "none",
  },
  buttonHover: {
    background: "linear-gradient(135deg, #43e97b, #38f9d7)", // match play again hover
    transform: "scale(1.07)",
    boxShadow: "0 6px 24px rgba(67, 233, 123, 0.8)",
  },
  playAgainButton: {
    color: "#f3f3fc",
    fontWeight: 600,
    padding: "0.85rem 2.1rem",
    borderRadius: "0.7rem",
    fontSize: "1.17rem",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(120deg, #30f2af, #647dee)",
    boxShadow: "0 4px 18px rgba(48, 242, 175, 0.45)",
    transition: "transform 0.2s, background 0.3s",
    outline: "none",
    marginTop: "1.5rem",
    userSelect: "none",
  },
  playAgainButtonHover: {
    background: "linear-gradient(135deg, #43e97b, #38f9d7)",
    transform: "scale(1.07)",
    boxShadow: "0 6px 24px rgba(67, 233, 123, 0.8)",
  },
  guessCount: {
    fontSize: "1.08rem",
    color: "#dedff7",
    marginTop: "1.3rem",
    fontWeight: 500,
  },
};

// ---------------- Confetti Component ----------------
function Confetti({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    const colors = [
      "#f87171",
      "#34d399",
      "#60a5fa",
      "#fbbf24",
      "#a78bfa",
      "#f472b6",
    ];

    const confettiCount = 150;
    const confettis = [];
    for (let i = 0; i < confettiCount; i++) {
      confettis.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 6 + 4,
        d: Math.random() * confettiCount + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
        tiltAngleIncrement: Math.random() * 0.07 + 0.05,
      });
    }

    let animationFrameId;
    let angle = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);
      confettis.forEach((c) => {
        ctx.beginPath();
        ctx.lineWidth = c.r / 2;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 4, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 4);
        ctx.stroke();
      });
      update();
    }

    function update() {
      angle += 0.01;
      confettis.forEach((c) => {
        c.tiltAngle += c.tiltAngleIncrement;
        c.y += (Math.cos(angle + c.d) + 3 + c.r / 2) / 2;
        c.x += Math.sin(angle);
        c.tilt = Math.sin(c.tiltAngle) * 15;
        if (c.y > height) {
          c.x = Math.random() * width;
          c.y = -20;
          c.tilt = Math.random() * 10 - 10;
        }
      });
    }

    function resize() {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    }
    window.addEventListener("resize", resize);

    function animate() {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    const timer = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, width, height);
    }, 5000);

    return () => {
      window.removeEventListener("resize", resize);
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, width, height);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 100,
      }}
    />
  );
}

// ---------------- Message Component ----------------
function Message({ text, animation }) {
  let style = { ...styles.message };
  if (animation === "shake") style = { ...style, ...styles.messageShake };
  else if (animation === "pulse") style = { ...style, ...styles.messagePulse };

  return <div style={style}>{text}</div>;
}

// ---------------- Input Area ----------------
function InputArea({ guess, setGuess, onGuess, inputRef }) {
  const [btnHover, setBtnHover] = useState(false);
  const buttonStyle = btnHover
    ? { ...styles.button, ...styles.buttonHover }
    : styles.button;

  function onKeyDown(e) {
    if (e.key === "Enter") onGuess();
  }
  function handleFocus(e) {
    e.target.style.borderColor = "#b39ddb";
  }
  function handleBlur(e) {
    e.target.style.borderColor = "#817cc4";
  }

  return (
    <div style={styles.inputArea}>
      <input
        type="number"
        placeholder="Your guess..."
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={onKeyDown}
        style={styles.input}
        ref={inputRef}
        min="1"
        max="100"
        aria-label="Number guess input"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button
        style={buttonStyle}
        onClick={onGuess}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
      >
        Guess
      </button>
    </div>
  );
}

// ---------------- Play Again Button ----------------
function PlayAgainButton({ onClick }) {
  const [hover, setHover] = useState(false);
  const style = hover
    ? { ...styles.playAgainButton, ...styles.playAgainButtonHover }
    : styles.playAgainButton;

  return (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Let’s go again!
    </button>
  );
}

// ---------------- Main Game Component ----------------
export default function NumberGuessingGame() {
  const [secretNumber, setSecretNumber] = useState(generateSecretNumber());
  const [guessCount, setGuessCount] = useState(0);
  const [message, setMessage] = useState(
    "Pick a number from 1 to 100 — let’s see if you got those guessing skills!"
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [guess, setGuess] = useState("");
  const [messageAnimation, setMessageAnimation] = useState("");
  const [confettiActive, setConfettiActive] = useState(false);

  const inputRef = useRef(null);

  function generateSecretNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function focusInput() {
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  }

  function resetGame() {
    setSecretNumber(generateSecretNumber());
    setGuessCount(0);
    setMessage(
      "Pick a number from 1 to 100 — let’s see if you got those guessing skills!"
    );
    setIsGameOver(false);
    setGuess("");
    setMessageAnimation("");
    setConfettiActive(false);
    focusInput();
  }

  function handleGuess() {
    if (isGameOver) return;
    const userGuess = parseInt(guess, 10);

    if (isNaN(userGuess)) {
      setMessage("Hmm, that ain’t a number. Try again!");
      setMessageAnimation("shake");
      return;
    }

    setGuessCount((c) => c + 1);

    if (userGuess === secretNumber) {
      setMessage(`Yaaas! You nailed it in just ${guessCount + 1} tries!`);
      setIsGameOver(true);
      setMessageAnimation("pulse");
      setConfettiActive(true);
    } else if (userGuess < secretNumber) {
      setMessage("Nah, that’s kinda low... Aim higher!");
      setMessageAnimation("shake");
      setConfettiActive(false);
    } else {
      setMessage("Whoa, that's waaay too high! Chill a bit!");
      setMessageAnimation("shake");
      setConfettiActive(false);
    }

    setGuess("");
    focusInput();
  }

  useEffect(() => {
    if (messageAnimation) {
      const timeout = setTimeout(() => setMessageAnimation(""), 600);
      return () => clearTimeout(timeout);
    }
  }, [messageAnimation]);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.boxSizing = "border-box";
  }, []);

  return (
    <>
      <style>{fadeInAnimation}</style>
      <div style={styles.container}>
        <Confetti active={confettiActive} />
        <div style={styles.title}>Guess That Number!</div>
        <Message text={message} animation={messageAnimation} />
        {!isGameOver && (
          <InputArea
            guess={guess}
            setGuess={setGuess}
            onGuess={handleGuess}
            inputRef={inputRef}
          />
        )}
        {isGameOver && <PlayAgainButton onClick={resetGame} />}
        <div style={styles.guessCount}>Attempts: {guessCount}</div>
      </div>
    </>
  );
}
