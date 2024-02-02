const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts: [
        {
          name: "Michele",
          avatar: "./img/avatar_1.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "./img/avatar_2.png",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "./img/avatar_3.png",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "./img/avatar_4.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "./img/avatar_5.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "./img/avatar_6.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
        {
          name: "Federico",
          avatar: "./img/avatar_7.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Davide",
          avatar: "./img/avatar_8.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],

      activeContactIndex: 0,

      newSentMessage: {
        date: "",
        message: "",
        status: "sent",
      },

      filterString: "",
    };
  },

  computed: {
    activeContact() {
      return this.contacts[this.activeContactIndex];
    },
  },

  methods: {
    convertImage() {
      this.contacts.forEach((contact) => {
        contact.avatar = contact.avatar.replace("png", "jpg");
      });
    },

    selectContact(index) {
      this.activeContactIndex = index;
    },

    printLastMessageDate(index) {
      if (this.activeContact.messages.length > 0) {
        const lastDate =
          this.contacts[index].messages[
            this.contacts[index].messages.length - 1
          ].date;

        const lastDateArray = lastDate.split(" ");

        [date, hour] = lastDateArray;

        return `Ultimo accesso il ${date} alle ${hour}`;
      } else return "";
    },

    splitDate(date) {
      const splittedDate = date.split(" ");
      [messageDate, hour] = splittedDate;
      return hour;
    },

    sendNewMessage(index) {
      if (this.newSentMessage.message) {
        const newSentMessageCopy = { ...this.newSentMessage };
        const newCurrentDate = this.getCurrentDate();
        newSentMessageCopy.date = newCurrentDate;

        this.contacts[index].messages.push(newSentMessageCopy);

        this.newSentMessage.message = "";
        setTimeout(() => {
          this.generateReply(this.contacts[index].messages);
        }, 1000);
      }
    },

    generateReply(array) {
      const newCurrentDate = this.getCurrentDate();
      const replyMessage = {
        date: newCurrentDate,
        message: "OK!!",
        status: "received",
      };

      array.push(replyMessage);
    },

    deleteMessage(messageindex) {
      this.activeContact.messages.splice(messageindex, 1);

      /*       if (this.activeContact.messages.length == 0) {
        this.contacts.splice(this.activeContactIndex, 1);

        if (this.activeContactIndex >= this.contacts.length - 1) {
          this.activeContactIndex = this.contacts.length - 1;
        }
      } */
    },

    getCurrentDate() {
      let now = new Date();

      let currentDay = now.getDate();
      if (currentDay < 10) currentDay = "0" + currentDay;

      let currentMonth = now.getMonth() + 1;
      if (currentMonth < 10) currentMonth = "0" + currentMonth;

      let currentYear = now.getFullYear();

      let currentHours = now.getHours();
      if (currentHours < 10) currentHours = "0" + currentHours;

      let currentMins = now.getMinutes();
      if (currentMins < 10) currentMins = "0" + currentMins;

      let currentSec = now.getSeconds();
      if (currentSec < 10) currentSec = "0" + currentSec;

      let completeDate = `${currentDay}/${currentMonth}/${currentYear} ${currentHours}:${currentMins}:${currentSec}`;

      return completeDate;
    },

    filterContact(string) {
      if (string) {
        this.contacts.forEach((contact) => {
          contact.visible = contact.name.toLowerCase().includes(string)
            ? true
            : false;
        });
      } else if (!string) {
        this.contacts.forEach((contact) => {
          contact.visible = true;
        });
      }
    },
  },

  beforeMount() {
    this.convertImage();
  },

  mounted() {},
}).mount("#app");
