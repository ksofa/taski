import { ClockIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardTitle } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

// Data for tasks
const tasks = [
  {
    times: ["10:17", "12:35", "14:00"],
    descriptions: [
      "Верстка диалогового окна и страницы поиска",
      "Доработка ТЗ, указать время на проработку Back'a",
      "Дать обратную связь по функционалу сервису",
    ],
  },
  {
    times: ["14:12", "15:27", "16:41"],
    descriptions: [
      "Верстка диалогового окна и страницы поиска",
      "Доработка ТЗ, указать время на проработку Back'a",
      "Дать обратную связь по функционалу сервису",
    ],
  },
];

// Data for conferences
const conferences = {
  times: ["10:17", "12:35", "14:00"],
  descriptions: ["Обсуждение концепции", "Планирование спринта", "Стендап"],
};

// Data for applications
const applications = [
  {
    title: "DasyTroon - производство подшипников",
    time: "12 часов 17 минут",
  },
  {
    title: "Страница расчета кредитования в рамках банковского продукта",
    time: "3 часа 57 минут",
  },
  {
    title: "Корпоративный мессенджер с телефонией",
    time: "12 часов 17 минут",
  },
  {
    title: "Приложение кофейни",
    time: "20 часов 57 минут",
  },
];

// Data for team invitations
const teamRoles = [
  "Front-end",
  "Back-end",
  "UX/UI Дизайнер",
  "Графический дизайнер",
  "Аналитик",
];

// Data for events
const events = [
  {
    title: "Заказчик оставил комментарий по проекту Приложение кофейни",
    category: "Комментарии",
    time: "16:17",
  },
  {
    title: "Выполнен вывод средств",
    category: "Финансы",
    time: "16:01",
  },
  {
    title: "У вас осталось 3 дня до дедлайна",
    category: "Проекты",
    time: "15:42",
  },
  {
    title: "Проект был принят заказчиком",
    category: "Проекты",
    time: "14:33",
  },
  {
    title: "Проект вернули с правками",
    category: "Проекты",
    time: "13:56",
  },
  {
    title: "Дедлайн просрочен",
    category: "Проекты",
    time: "12:16",
  },
  {
    title: "До дедлайна осталось 2 дня",
    category: "Проекты",
    time: "12:16",
  },
];

// Data for calendar events
const calendarEvents = [
  { number: "1", description: "Наименование проекта" },
  { number: "2", description: "Наименование проекта" },
  { number: "3", description: "Наименование проекта" },
  { number: "4", description: "Наименование проекта" },
];

export const FrameByAnima = (): JSX.Element => {
  return (
    <section className="w-full p-8 mt-20">
      <div className="flex flex-col w-full items-start gap-6">
        {/* Top row with user profile and daily schedule */}
        <div className="flex items-center gap-5 w-full flex-wrap">
          {/* User profile card */}
          <Card className="bg-main-colorsbackground rounded-2xl flex-grow">
            <CardContent className="p-8 flex items-start gap-4 relative">
              <img
                className="w-32 h-32 object-cover"
                alt="Profile"
                src="/image.png"
              />

              <div className="flex flex-col items-start gap-6">
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-start gap-2">
                    <Badge className="h-5 px-2 py-1 rounded-full border border-solid border-[#dd8126] bg-transparent">
                      <span className="text-main-colorsorange font-status font-[number:var(--status-font-weight)] text-[length:var(--status-font-size)] tracking-[var(--status-letter-spacing)] leading-[var(--status-line-height)]">
                        Занят
                      </span>
                    </Badge>

                    <Badge className="h-5 px-2 py-1 rounded-full border border-solid border-[#a5a5a7] bg-transparent">
                      <span className="text-neutralneutral-40 font-status font-[number:var(--status-font-weight)] text-[length:var(--status-font-size)] tracking-[var(--status-letter-spacing)] leading-[var(--status-line-height)]">
                        Доступен с 13 до 18
                      </span>
                    </Badge>
                  </div>

                  <h2 className="font-h1-alternative font-[number:var(--h1-alternative-font-weight)] text-neutralneutral-10 text-[length:var(--h1-alternative-font-size)] leading-[var(--h1-alternative-line-height)] tracking-[var(--h1-alternative-letter-spacing)]">
                    Привет, Евгений К.
                  </h2>
                </div>

                <div className="flex items-start">
                  <div className="flex h-11 items-center gap-3 mr-4">
                    <span className="text-main-colorsaqua text-[length:var(--number-1-font-size)] leading-[var(--number-1-line-height)] font-number-1 font-[number:var(--number-1-font-weight)] tracking-[var(--number-1-letter-spacing)]">
                      3
                    </span>

                    <span className="w-[98px] font-paragraph-16 font-[number:var(--paragraph-16-font-weight)] text-neutralneutral-10 text-[length:var(--paragraph-16-font-size)] tracking-[var(--paragraph-16-letter-spacing)] leading-[var(--paragraph-16-line-height)]">
                      Активные проекты
                    </span>
                  </div>

                  <div className="flex h-11 items-center gap-3">
                    <span className="text-main-colorsaqua text-[length:var(--number-1-font-size)] leading-[var(--number-1-line-height)] font-number-1 font-[number:var(--number-1-font-weight)] tracking-[var(--number-1-letter-spacing)]">
                      4
                    </span>

                    <span className="w-[98px] font-paragraph-16 font-[number:var(--paragraph-16-font-weight)] text-neutralneutral-10 text-[length:var(--paragraph-16-font-size)] tracking-[var(--paragraph-16-letter-spacing)] leading-[var(--paragraph-16-line-height)]">
                      Участник команд
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-8 h-8 items-center justify-center gap-2.5 p-2.5 absolute top-8 left-[118px] bg-main-colorsgreen rounded-full">
                <span className="font-medium text-neutralneutral-100 text-sm text-right leading-6 [font-family:'Inter',Helvetica]">
                  8.8
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Daily schedule card */}
          <Card className="bg-main-colorsbackground rounded-2xl flex-grow">
            <CardContent className="p-8 flex flex-col gap-10">
              <div className="flex flex-col gap-3 w-full">
                <h2 className="font-h2 font-[number:var(--h2-font-weight)] text-neutralneutral-10 text-[length:var(--h2-font-size)] leading-[var(--h2-line-height)] tracking-[var(--h2-letter-spacing)]">
                  На сегодня:
                </h2>

                <div className="flex items-center gap-6 w-full">
                  {/* Tasks section */}
                  <div className="flex flex-col items-start justify-center gap-2 flex-1">
                    <h3 className="font-paragraph-16-medium font-[number:var(--paragraph-16-medium-font-weight)] text-neutralneutral-10 text-[length:var(--paragraph-16-medium-font-size)] leading-[var(--paragraph-16-medium-line-height)] tracking-[var(--paragraph-16-medium-letter-spacing)]">
                      Задачи:
                    </h3>

                    <div className="flex items-start gap-6 w-full">
                      {tasks.map((taskGroup, groupIndex) => (
                        <div
                          key={groupIndex}
                          className="flex flex-col h-[68px] items-start justify-between flex-1"
                        >
                          {taskGroup.times.map((time, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 w-full"
                            >
                              <span className="w-10 font-status font-[number:var(--status-font-weight)] text-neutralneutral-60 text-[length:var(--status-font-size)] leading-[var(--status-line-height)] tracking-[var(--status-letter-spacing)]">
                                {time}
                              </span>

                              <div className="flex justify-center gap-2.5 flex-1 rounded-sm items-center">
                                <span className="flex-1 text-neutralneutral-10 text-[length:var(--paragraph-16-font-size)] leading-[var(--paragraph-16-line-height)] font-paragraph-16 font-[number:var(--paragraph-16-font-weight)] tracking-[var(--paragraph-16-letter-spacing)]">
                                  {taskGroup.descriptions[index]}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator orientation="vertical" className="h-[95px]" />

                  {/* Conferences section */}
                  <div className="flex flex-col items-start justify-center gap-2">
                    <h3 className="font-paragraph-16-medium font-[number:var(--paragraph-16-medium-font-weight)] text-neutralneutral-10 text-[length:var(--paragraph-16-medium-font-size)] leading-[var(--paragraph-16-medium-line-height)] tracking-[var(--paragraph-16-medium-letter-spacing)]">
                      Конференции:
                    </h3>

                    <div className="flex items-start gap-12">
                      <div className="flex flex-col h-[68px] items-start justify-between">
                        {conferences.times.map((time, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <span className="w-10 font-status font-[number:var(--status-font-weight)] text-neutralneutral-60 text-[length:var(--status-font-size)] leading-[var(--status-line-height)] tracking-[var(--status-letter-spacing)]">
                              {time}
                            </span>

                            <div className="flex justify-center gap-2.5 rounded-sm items-center">
                              <span className="text-neutralneutral-10 text-[length:var(--paragraph-16-font-size)] leading-[var(--paragraph-16-line-height)] whitespace-nowrap font-paragraph-16 font-[number:var(--paragraph-16-font-weight)] tracking-[var(--paragraph-16-letter-spacing)]">
                                {conferences.descriptions[index]}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content section */}
        <div className="flex flex-col items-start gap-8 px-8 py-10 w-full bg-main-colorsbackground rounded-[16px_16px_0px_0px]">
          <h1 className="font-h1-alternative font-[number:var(--h1-alternative-font-weight)] text-neutralneutral-10 text-[length:var(--h1-alternative-font-size)] leading-[var(--h1-alternative-line-height)] tracking-[var(--h1-alternative-letter-spacing)]">
            Самое важное
          </h1>

          <div className="flex gap-4 w-full">
            {/* Left column with applications and team invitations */}
            <div className="flex flex-col items-start justify-center gap-4 flex-1">
              {/* Applications card */}
              <Card className="w-full bg-neutralneutral-100 rounded-xl border border-solid border-[#ececec]">
                <CardContent className="p-6 flex flex-col gap-6">
                  <div className="flex items-start gap-3 w-full">
                    <div className="flex items-center gap-2 flex-1">
                      <CardTitle className="font-h2 font-[number:var(--h2-font-weight)] text-neutralneutral-10 text-[length:var(--h2-font-size)] leading-[var(--h2-line-height)] tracking-[var(--h2-letter-spacing)]">
                        Заявки на расчет
                      </CardTitle>

                      <Badge className="w-8 h-6 flex items-center justify-center bg-neutralneutral-90 rounded-full">
                        <span className="text-neutralneutral-10 text-[length:var(--paragraph-16-medium-font-size)] text-center leading-[var(--paragraph-16-medium-line-height)] font-paragraph-16-medium font-[number:var(--paragraph-16-medium-font-weight)] tracking-[var(--paragraph-16-medium-letter-spacing)]">
                          7
                        </span>
                      </Badge>
                    </div>

                    <button className="text-main-colorsaqua text-[length:var(--paragraph-16-font-size)] leading-[var(--paragraph-16-line-height)] font-paragraph-16 font-[number:var(--paragraph-16-font-weight)] tracking-[var(--paragraph-16-letter-spacing)]">
                      Смотреть все
                    </button>
                  </div>

                  <div className="flex flex-col items-start gap-4 w-full">
                    <div className="flex gap-4 w-full">
                      {applications.slice(0, 2).map((app, index) => (
                        <Card
                          key={index}
                          className="flex-1 flex items-center gap-2.5 px-4 py-3 rounded-lg border border-solid border-[#ececec]"
                        >
                          <CardContent className="p-0 flex flex-col items-start gap-2 w-full">
                            <div className="flex items-start gap-2 w-full">
                              <div className="flex-1 h-10 font-paragraph-16 font-[number:var(--paragraph-16-font-weight)] text-neutralneutral-10 text-[length:var(--paragraph-16-font-size)] tracking-[var(--paragraph-16-letter-spacing)] leading-[var(--paragraph-16-line-height)] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                                {app.title}
                              </div>

                              <div className="flex flex-col items-end">
                                <img
                                  className="w-6 h-6"
                                  alt="Frame"
                                  src="/frame-5.svg"
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-center gap-1">
                              <ClockIcon className="w-4 h-4 text-neutralneutral-60" />

                              <span className="font-paragraph-14-medium font-[number:var(--paragraph-14-medium-font-weight)] text-neutralneutral-60 text-[length:var(--paragraph-14-medium-font-size)] tracking-[var(--paragraph-14-medium-letter-spacing)] leading-[var(--paragraph-14-medium-line-height)]">
                                {app.time}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex gap-4 w-full">
                      {applications.slice(2, 4).map((app, index) => (
                        <Card
                          key={index}
                          className="flex-1 flex items-center gap-2.5 px-4 py-3 rounded-lg border border-solid border-[#ececec]"
                        >
                          <CardContent className="p-0 flex flex-col items-start gap-2 w-full">
                            <div className="flex items-start gap-2 w-full">
                              <div className="flex-1 h-10 font-paragraph-16 font-[number:var(--paragraph-16-font-weight)] text-neutralneutral-10 text-[length:var(--paragraph-16-font-size)] tracking-[var(--paragraph-16-letter-spacing)] leading-[var(--paragraph-16-line-height)] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                                {app.title}
                              </div>

                              <div className="flex flex-col items-end">
                                <img
                                  className="w-6 h-6"
                                  alt="Frame"
                                  src="/frame-5.svg"
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-center gap-1">
                              <ClockIcon className="w-4 h-4 text-neutralneutral-60" />

                              <span className="font-paragraph-14-medium font-[number:var(--paragraph-14-medium-font-weight)] text-neutralneutral-60 text-[length:var(--paragraph-14-medium-font-size)] tracking-[var(--paragraph-14-medium-letter-spacing)] leading-[var(--paragraph-14-medium-line-height)]">
                                {app.time}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team invitations card */}
              <Card className="w-full bg-neutralneutral-100 rounded-xl border border-solid border-[#ececec]">
                <CardContent className="p-6 flex flex-col gap-6">
                  <div className="flex items-start gap-3 w-full">
                    <div className="flex items-center gap-2 flex-1">
                      <CardTitle className="font-h2 font-[number:var(--h2-font-weight)] text-neutralneutral-10 text-[length:var(--h2-font-size)] leading-[var(--h2-line-height)] tracking-[var(--h2-letter-spacing)]">
                        Приглашения в команду
                      </CardTitle>

                      <Badge className="w-8 h-6 flex items-center justify-center bg-neutralneutral-90 rounded-full">
                        <span className="text-neutralneutral-10 text-[length:var(--paragraph-16-medium-font-size)] text-center leading-[var(--paragraph-16-medium-line-height)] font-paragraph-16-medium font-[number:var(--paragraph-16-medium-font-weight)] tracking-[var(--paragraph-16-medium-letter-spacing)]">
                          4
                        </span>
                      </Badge>
                    </div>

                    <button className="text-main-colorsaqua text-[length:var(--paragraph-16-font-size)] leading-[var(--paragraph-16-line-height)] font-paragraph-16 font-[number:var(--paragraph-16-font-weight)] tracking-[var(--paragraph-16-letter-spacing)]">
                      Смотреть все
                    </button>
                  </div>

                  <div className="flex gap-4 w-full">
                    {[0, 1].map((index) => (
                      <Card
                        key={index}
                        className="flex-1 flex items-start gap-2.5 px-4 py-3 rounded-lg border border-solid border-[#ececec]"
                      >
                        <CardContent className="p-0 flex flex-col items-start gap-8 w-full">
                          <div className="flex flex-col gap-3 w-full">
                            <div className="flex items-start gap-3 w-full">
                              <span className="flex-1 font-paragraph-16 font-[number:var(--paragraph-16-font-weight)] text-neutralneutral-10 text-[length:var(--paragraph-16-font-size)] tracking-[var(--paragraph-16-letter-spacing)] leading-[var(--paragraph-16-line-height)]">
                                Состав:
                              </span>
                            </div>

                            <div className="flex flex-col items-start gap-2 w-full">
                              <div className="flex flex-wrap items-start gap-[4px_4px] w-full">
                                {teamRoles.map((role, roleIndex) => (
                                  <Badge
                                    key={roleIndex}
                                    className="px-1 py-0.5 bg-neutralneutral-90 rounded"
                                  >
                                    <span className="font-paragraph-14 font-[number:var(--paragraph-14-font-weight)] text-neutralneutral-10 text-[length:var(--paragraph-14-font-size)] tracking-[var(--paragraph-14-letter-spacing)] leading-[var(--paragraph-14-line-height)]">
                                      {role}
                                    </span>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-1">
                              <span className="font-paragraph-16 font-[number:var(--paragraph-16-font-weight)] text-neutralneutral-60 text-[length:var(--paragraph-16-font-size)] tracking-[var(--paragraph-16-letter-spacing)] leading-[var(--paragraph-16-line-height)]">
                                РП:
                              </span>

                              <div className="flex items-center">
                                <span className="font-paragraph-16 font-[number:var(--paragraph-16-font-weight)] text-neutralneutral-10 text-[length:var(--paragraph-16-font-size)] tracking-[var(--paragraph-16-letter-spacing)] leading-[var(--paragraph-16-line-height)]">
                                  Елена В.
                                </span>

                                <img
                                  className="w-5 h-5"
                                  alt="Chevron"
                                  src="/chevron.svg"
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-center gap-1">
                              <ClockIcon className="w-4 h-4 text-neutralneutral-60" />

                              <span className="font-paragraph-14-medium font-[number:var(--paragraph-14-medium-font-weight)] text-neutralneutral-60 text-[length:var(--paragraph-14-medium-font-size)] tracking-[var(--paragraph-14-medium-letter-spacing)] leading-[var(--paragraph-14-medium-line-height)]">
                                {index === 0
                                  ? "3 часа 27 минут"
                                  : "23 часа 59 минут"}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Events card */}
            <Card className="flex-1 h-[556px] bg-neutralneutral-100 rounded-xl border border-solid border-[#ececec] overflow-hidden">
              <CardContent className="p-6 flex flex-col gap-6">
                <div className="flex items-start gap-6 px-2 w-full">
                  <div className="flex items-center gap-2 flex-1">
                    <CardTitle className="font-h2 font-[number:var(--h2-font-weight)] text-neutralneutral-10 text-[length:var(--h2-font-size)] leading-[var(--h2-line-height)] tracking-[var(--h2-letter-spacing)]">
                      События
                    </CardTitle>

                    <Badge className="w-8 h-6 flex items-center justify-center bg-neutralneutral-90 rounded-full">
                      <span className="text-neutralneutral-10 text-[length:var(--paragraph-16-medium-font-size)] text-center leading-[var(--paragraph-16-medium-line-height)] font-paragraph-16-medium font-[number:var(--paragraph-16-medium-font-weight)] tracking-[var(--paragraph-16-medium-letter-spacing)]">
                        12
                      </span>
                    </Badge>
                  </div>

                  <div className="h-7 pl-3 pr-2 py-0 rounded-full border border-solid border-[#dededf] flex items-center">
                    <span className="font-paragraph-14 font-[number:var(--paragraph-14-font-weight)] text-neutralneutral-20 text-[length:var(--paragraph-14-font-size)] tracking-[var(--paragraph-14-letter-spacing)] leading-[var(--paragraph-14-line-height)]">
                      Сегодня
                    </span>

                    <img className="w-6 h-6" alt="Frame" src="/frame-1.svg" />
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 w-full mb-[-24px]">
                  {events.map((event, index) => (
                    <React.Fragment key={index}>
                      <div className="flex flex-col items-start p-2 w-full rounded-lg gap-1">
                        <h3 className="font-paragraph-16-medium font-[number:var(--paragraph-16-medium-font-weight)] text-neutralneutral-10 text-[length:var(--paragraph-16-medium-font-size)] tracking-[var(--paragraph-16-medium-letter-spacing)] leading-[var(--paragraph-16-medium-line-height)]">
                          {event.title}
                        </h3>

                        <div className="flex items-start gap-4">
                          <span className="font-status font-[number:var(--status-font-weight)] text-neutralneutral-60 text-[length:var(--status-font-size)] tracking-[var(--status-letter-spacing)] leading-[var(--status-line-height)]">
                            {event.category}
                          </span>

                          <span className="font-paragraph-14-medium font-[number:var(--paragraph-14-medium-font-weight)] text-neutralneutral-60 text-[length:var(--paragraph-14-medium-font-size)] tracking-[var(--paragraph-14-medium-letter-spacing)] leading-[var(--paragraph-14-medium-line-height)]">
                            {event.time}
                          </span>
                        </div>
                      </div>

                      {index < events.length - 1 && (
                        <Separator className="w-full" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar events card */}
          <Card className="w-full bg-neutralneutral-100 rounded-xl border border-solid border-[#ececec]">
            <CardContent className="p-8 flex flex-col items-start gap-6">
              <CardTitle className="font-h2 font-[number:var(--h2-font-weight)] text-neutralneutral-10 text-[length:var(--h2-font-size)] leading-[var(--h2-line-height)] tracking-[var(--h2-letter-spacing)]">
                Календарь событий
              </CardTitle>

              <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex gap-4 w-full">
                  {calendarEvents.slice(0, 2).map((event, index) => (
                    <Card
                      key={index}
                      className="flex-1 flex gap-2.5 px-4 py-3 rounded-lg border border-solid border-[#dededf]"
                    >
                      <CardContent className="p-0 flex flex-col items-start gap-1 w-full">
                        <h3 className="w-full font-paragraph-16-medium font-[number:var(--paragraph-16-medium-font-weight)] text-neutralneutral-10 text-[length:var(--paragraph-16-medium-font-size)] tracking-[var(--paragraph-16-medium-letter-spacing)] leading-[var(--paragraph-16-medium-line-height)]">
                          Заявка №{event.number}
                        </h3>

                        <p className="w-full font-paragraph-16 font-[number:var(--paragraph-16-font-weight)] text-neutralneutral-40 text-[length:var(--paragraph-16-font-size)] tracking-[var(--paragraph-16-letter-spacing)] leading-[var(--paragraph-16-line-height)]">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-4 w-full">
                  {calendarEvents.slice(2, 4).map((event, index) => (
                    <Card
                      key={index}
                      className="flex-1 flex gap-2.5 px-4 py-3 rounded-lg border border-solid border-[#dededf]"
                    >
                      <CardContent className="p-0 flex flex-col items-start gap-1 w-full">
                        <h3 className="w-full font-paragraph-16-medium font-[number:var(--paragraph-16-medium-font-weight)] text-neutralneutral-10 text-[length:var(--paragraph-16-medium-font-size)] tracking-[var(--paragraph-16-medium-letter-spacing)] leading-[var(--paragraph-16-medium-line-height)]">
                          Заявка №{event.number}
                        </h3>

                        <p className="w-full font-paragraph-16 font-[number:var(--paragraph-16-font-weight)] text-neutralneutral-40 text-[length:var(--paragraph-16-font-size)] tracking-[var(--paragraph-16-letter-spacing)] leading-[var(--paragraph-16-line-height)]">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
