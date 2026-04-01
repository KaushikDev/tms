const firstNames = ["Alice", "Bob", "Claire", "David", "Eve", "Frank", "Grace", "Hank", "Ivy", "Jack", "Kaushik", "Liam", "Mia", "Noah", "Olivia", "Piyush", "Quinn", "Rahul", "Sophia", "Tara", "Uma", "Victor", "Wendy", "Xander", "Yara", "Zane"];
const lastNames = ["Johnson", "Smith", "Wilson", "Lee", "Taylor", "White", "Hall", "Miller", "Lopez", "Brown", "Sharma", "Patel", "Singh", "Kumar", "Gupta"];

const actions = ["Fix", "Update", "Implement", "Refactor", "Optimize", "Review", "Test", "Deploy", "Design", "Document", "Audit", "Scale"];
const features = [
  "login bug", "dark mode CSS", "API documentation", "database queries", 
  "email notifications", "user analytics", "UI guidance tool", "game spritesheets", 
  "payment gateway", "dashboard metrics", "AG Grid performance", "session storage caching", 
  "mobile responsiveness", "OAuth integration", "landing page conversion", "level design assets",
  "ancient Indian theme models", "NodeJS server memory leak", "Micro-SaaS billing logic"
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const generateDate = (start, end) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

const generateTickets = (count, isDeleted = false) => {
  return Array.from({ length: count }).map(() => {
    const action = getRandomItem(actions);
    const feature = getRandomItem(features);
    const createdDate = generateDate(new Date(2024, 0, 1), new Date());
    
    const ticket = {
      id: generateId(),
      title: `${action} ${feature}`,
      description: `Need to look into the ${feature} and ensure it meets deployment standards. Assignee must ${action.toLowerCase()} this before the next sprint review.`,
      assignedTo: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
      createdOn: createdDate,
    };

    if (isDeleted) {
      // Ensure deletion date is after creation date
      const [datePart] = createdDate.split(', ');
      const [day, month, year] = datePart.split('/');
      const createdObj = new Date(year, month - 1, day);
      ticket.deletedOn = generateDate(createdObj, new Date());
    }

    return ticket;
  });
};

// Generates 420 active tickets and 80 deleted tickets instantly
export const dummyData = {
  tickets: generateTickets(420, false),
  recentlyDeleted: generateTickets(80, true),
};