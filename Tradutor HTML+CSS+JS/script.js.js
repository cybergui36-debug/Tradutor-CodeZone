async function traduzir() {
  const entrada = document.getElementById("entrada").value.trim();
  const resultadoDiv = document.getElementById("resultado");
  const langOption = document.querySelector("input[name='lang']:checked").value;

  if (!entrada) {
    resultadoDiv.innerHTML = "<p>Digite um texto para traduzir.</p>";
    return;
  }

  resultadoDiv.innerHTML = "<p>⏳ Traduzindo...</p>";

  // Definir direções
  let source = "en";
  let target = "pt";
  if (langOption === "pt-en") {
    source = "pt";
    target = "en";
  }

  try {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: entrada,
        source,
        target,
        format: "text"
      })
    });

    const data = await res.json();
    resultadoDiv.innerHTML = `
      <div class="card">
        <strong>Original:</strong><br> ${entrada}
      </div>
      <div class="card">
        <strong>Tradução:</strong><br> ${data.translatedText}
      </div>
    `;
  } catch (e) {
    resultadoDiv.innerHTML = "<p style='color:red'>❌ Erro ao traduzir. Tente novamente.</p>";
    console.error(e);
  }
}
