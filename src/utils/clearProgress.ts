export const clearProgress = () => {
  // Limpar progresso do localStorage
  localStorage.removeItem('progresso');
  localStorage.removeItem('courseProgress');
  
  // Recarregar a página para aplicar as mudanças
  window.location.reload();
};

export const resetAllProgress = () => {
  // Limpar todos os dados relacionados ao progresso
  localStorage.removeItem('progresso');
  localStorage.removeItem('courseProgress');
  
  // Limpar qualquer outro item relacionado ao progresso
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.includes('progresso') || key.includes('progress') || key.includes('modulo_'))) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  console.log('✅ Progresso limpo com sucesso!');
}; 