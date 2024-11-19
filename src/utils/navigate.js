// Esta función navega a una nueva URL y carga la página correspondiente
export async function navigate(to) {
    history.pushState({}, '', to);
    await loadPage();
  }