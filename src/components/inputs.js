export const inputsTypesOfEstate = [
  {
    value: "buildingApartment",
    children: "Новостройка",
    name: "typeOfEstate",
    risks: ["lifeRisk"],
  },
  {
    value: "apartment",
    children: "Квартира",
    name: "typeOfEstate",
    risks: ["lifeRisk", "estateRisk", "titleRisk"],
  },
  {
    value: "house",
    children: "Жилой дом",
    name: "typeOfEstate",
    risks: ["lifeRisk", "estateRisk", "titleRisk"],
  },
  {
    value: "landLot",
    children: "Земельный участок",
    name: "typeOfEstate",
    risks: ["lifeRisk", "titleRisk"],
  },
];

export const inputsInsuranceTypes = [
  { name: "lifeInsurance", value: "lifeRisk", children: "Жизнь" },
  { name: "estateInsurance", value: "estateRisk", children: "Имущество" },
  { name: "titleInsurance", value: "titleRisk", children: "Титул" },
];

export const inputsLifeRiskGender = [
  {
    value: "male",
    children: "Мужской",
    name: "gender",
  },
  {
    value: "female",
    children: "Женский",
    name: "gender",
  },
];

export const occupationsList = [
  { name: "Администратор", riskLevel: "genderBasic" },
  { name: "Артист", riskLevel: "genderBasic" },
  { name: "Бухгалтер", riskLevel: "genderBasic" },
  { name: "Верстальщик", riskLevel: "genderBasic" },
  { name: "Водитель", riskLevel: "genderIncreased" },
  { name: "Водолаз", riskLevel: "genderIncreased" },
  { name: "Военнослужащий", riskLevel: "genderIncreased" },
  { name: "Воспитатель", riskLevel: "genderBasic" },
  { name: "Дворник", riskLevel: "genderBasic" },
  { name: "Журналист", riskLevel: "genderBasic" },
  { name: "Инженер", riskLevel: "genderBasic" },
  { name: "Инкассатор", riskLevel: "genderIncreased" },
  { name: "Конвоир", riskLevel: "genderIncreased" },
  { name: "Копирайтер", riskLevel: "genderBasic" },
  { name: "Медицинский работник", riskLevel: "genderBasic" },
  { name: "Моряк", riskLevel: "genderIncreased" },
  { name: "Педагог", riskLevel: "genderBasic" },
  { name: "Продавец", riskLevel: "genderBasic" },
  { name: "Пилот", riskLevel: "genderIncreased" },
  { name: "Пожарный", riskLevel: "genderIncreased" },
  { name: "Программист", riskLevel: "genderBasic" },
  { name: "Пенсионер", riskLevel: "genderIncreased" },
  { name: "Рабочий на производстве", riskLevel: "genderIncreased" },
  { name: "Руководитель", riskLevel: "genderBasic" },
  { name: "Сомелье", riskLevel: "genderBasic" },
  { name: "Спасатель", riskLevel: "genderIncreased" },
  { name: "Спортсмен", riskLevel: "genderIncreased" },
  { name: "Строитель", riskLevel: "genderIncreased" },
  { name: "Стропальщик", riskLevel: "genderIncreased" },
  { name: "Телохранитель", riskLevel: "genderIncreased" },
  { name: "Юрист", riskLevel: "genderBasic" },
  { name: "Другое (нет в списке)", riskLevel: "genderIncreased" },
];
export const inputsLifeRiskOccupation = [
  {
    name: "lowRisk",
    value: 1,
    children: [
      "Администратор",
      "Бухгалтер",
      "Верстальщик",
      "Воспитатель",
      "Журналист",
      "Инженер",
      "Копирайтер",
      "Медицинский работник",
      "Педагог",
      "Программист",
      "Руководитель",
      "Юрист",
    ],
  },
  {
    name: "hightRisk",
    value: 2,
    children: [
      "Водитель",
      "Военнослужащий",
      "Инкассатор",
      "Конвоир",
      "Пожарный",
      "Рабочий на производстве",
      "Спасатель",
      "Спортсмен",
      "Телохранитель",
    ],
  },
];
