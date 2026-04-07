/**
 * Calcula a mensagem de boas-vindas com base na data atual e no horário.
 * A mensagem muda a cada 30 minutos ou exibe saudações especiais em datas comemorativas.
 * @returns {string} A mensagem de boas-vindas.
 */
export const getWelcomeMessage = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const dateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  // Datas Comemorativas (MM-DD)
  const specialDates = {
    '12-25': 'Feliz Natal! Cade meu presente?',
    '12-24': 'Papai noel não existe',
    '01-01': 'Feliz Ano Novo! Adeus anos velho!',
    '10-31': 'Buh!',
    '09-07': 'Independência ou MORTE!',
    '06-12': 'Feliz dia dos Namorados para os pombinhos! '
  };

  if (specialDates[dateStr]) return specialDates[dateStr];

  // Mensagens Padrão
  const defaultMessages = [
    "allons-y alonso!!!!",
    `Geronimoooo!!!`,
    "seja bem vindos",
    "AAAAAAA!!!!",
    "Joguem sea of thieves!",
    `"nunca seja cruel, nunca seja covarde... Lembre-se: O ódio é sempre tolo e o amor é sempre sábio. Sempre tente ser bom, mas nunca falhe em ser gentil"`,
    "Codando...",
    `Ora, ora, ora, ora, ora, ora, ora, ora, ora, ora, ora, ora, ora!!!!`,
    `Wryyyyyyyyy!!!!!!!!`,
    `Erro : 404`,
    "Se a vida é amarga, e cafe é vida, logo o cafe tem que ser amargo",
    "Console.log(`Ola mundo!`)"
  ];

  // Muda a cada 30 minutos
  const thirtyMinInterval = Math.floor(now.getTime() / (1 * 60 * 1000));
  const index = thirtyMinInterval % defaultMessages.length;
  
  return defaultMessages[index];
};
