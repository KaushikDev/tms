const firstNames = [
  "Alice",
  "Bob",
  "Claire",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Hank",
  "Ivy",
  "Jack",
  "Kaushik",
  "Liam",
  "Mia",
  "Noah",
  "Olivia",
  "Piyush",
];
const lastNames = [
  "Johnson",
  "Smith",
  "Wilson",
  "Lee",
  "Taylor",
  "White",
  "Hall",
  "Miller",
  "Lopez",
  "Brown",
  "Sharma",
  "Patel",
];
const actions = [
  "Fix",
  "Update",
  "Implement",
  "Refactor",
  "Optimize",
  "Review",
  "Test",
  "Deploy",
];
const features = [
  "login bug",
  "dark mode CSS",
  "API documentation",
  "database queries",
  "email notifications",
  "user analytics",
  "UI guidance tool",
  "AG Grid performance",
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateDate = (start, end) => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

const generateTicket = (overrides = {}) => ({
  id: crypto.randomUUID(),
  title: `${getRandomItem(actions)} ${getRandomItem(features)}`,
  description:
    "Task involves updating the module. Priority is high for this sprint.",
  assignedTo: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
  status: overrides.status || "TODO",
  createdOn: generateDate(new Date(2024, 0, 1), new Date()),
  ...overrides,
});

// 1. RESOLVED TICKETS (Exactly 80)
const resolvedTickets = Array.from({ length: 80 }).map(() => {
  const t = generateTicket({ status: "RESOLVED" });
  const [datePart] = t.createdOn.split(", ");
  const [day, month, year] = datePart.split("/");
  t.resolvedOn = generateDate(new Date(year, month - 1, day), new Date());
  return t;
});

// 2. BACKLOG TICKETS (Exactly 108, Unassigned, TODO)
const backlogTickets = Array.from({ length: 108 }).map(() =>
  generateTicket({ assignedTo: "", status: "TODO" }),
);

// 3. ACTIVE TICKETS (Exactly 312, Assigned, In Cycle)
const activeTickets = Array.from({ length: 312 }).map(() =>
  generateTicket({ status: getRandomItem(["IN PROGRESS", "DONE", "READY"]) }),
);

export const dummyData = {
  tickets: [...backlogTickets, ...activeTickets], // 420 Total Unresolved Pipeline
  recentlyDeleted: resolvedTickets, // 80 Resolved
};
