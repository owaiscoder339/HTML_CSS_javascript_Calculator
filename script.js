  const display = document.getElementById("display");
  let expression = "";

  const buttons = document.querySelectorAll("button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (value === "C") {
        // Clear all
        expression = "";
        display.textContent = "0";
      } else if (value === "=") {
        // Calculate the expression
        try {
          const sanitized = expression.replace(/x/g, "*").replace(/÷/g, "/");
          const result = eval(sanitized);
          display.textContent = result;
          expression = result.toString();
        } catch (err) {
          display.textContent = "Error";
          expression = "";
        }
      } else if (value === "-/+") {
        // Toggle sign
        if (expression) {
          if (expression.startsWith("-")) {
            expression = expression.slice(1);
          } else {
            expression = "-" + expression;
          }
          display.textContent = expression;
        }
      } else if (value === "%") {
        // Percentage
        try {
          const result = eval(expression) / 100;
          display.textContent = result;
          expression = result.toString();
        } catch (err) {
          display.textContent = "Error";
          expression = "";
        }
      } else if (value === "←") {
        // Backspace one digit
        expression = expression.slice(0, -1);
        display.textContent = expression || "0";
      } else {
        // Append normal number/operator
        expression += value === "x" ? "*" : value;
        display.textContent = expression.replace(/\*/g, "x");
      }
    });
  });
