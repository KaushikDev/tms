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

const archivedTickets = Array.from({ length: 80 }).map(() => {
  const isDeleted = Math.random() > 0.8;
  const status = isDeleted ? "DELETED" : "RESOLVED";

  const t = generateTicket({ status });
  const [datePart] = t.createdOn.split(", ");
  const [day, month, year] = datePart.split("/");
  const actionDate = generateDate(new Date(year, month - 1, day), new Date());

  if (isDeleted) {
    t.archivedOn = actionDate;
  } else {
    t.resolvedOn = actionDate;
  }
  return t;
});

const backlogTickets = Array.from({ length: 108 }).map(() =>
  generateTicket({ assignedTo: "", status: "TODO" }),
);

const activeTickets = Array.from({ length: 312 }).map(() =>
  generateTicket({ status: getRandomItem(["IN PROGRESS", "DONE", "READY"]) }),
);

export const dummyData = {
  tickets: [...backlogTickets, ...activeTickets],
  archive: archivedTickets,
};
