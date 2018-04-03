new Vue({
  el: "#app",
  data: {
    heroHealth: 100,
    monsterHealth: 100,
    isGameStarted: false,
    actionLog: []
  },

  watch: {
    heroHealth: function() {
      if (this.heroHealth < 0) {
        if (confirm("You lost! Play again?")) {
          this.startGame();
        } else {
          this.isGameStarted = false;
          this.heroHealth = 0;
        }
      } else if (this.heroHealth > 100) {
        this.heroHealth = 100;
      }
    },
    monsterHealth: function() {
      if (this.monsterHealth < 0) {
        if (confirm("You won! Play again?")) {
          this.startGame();
        } else {
          this.isGameStarted = false;
          this.monsterHealth = 0;
        }
      }
    }
  },

  methods: {
    startGame: function() {
      this.isGameStarted = true;
      this.heroHealth = 100;
      this.monsterHealth = 100;
      this.actionLog = [];
    },

    attack: function() {
      const damage = this.getDamage(2, 10);
      this.monsterHealth -= damage;
      this.actionLog.unshift({
        action: "heroAttack",
        message: "Hero gives damage of " + damage + " to monster."
      });

      if (this.isGameStarted) {
        this.monsterAttack();
      }
    },

    specialAttack: function() {
      const damage = this.getDamage(11, 20);
      this.monsterHealth -= damage;
      this.actionLog.unshift({
        action: "heroSpecialAttack",
        message: "Hero deals power damage of " + damage + " to monster."
      });

      if (this.isGameStarted) {
        this.monsterAttack();
      }
    },

    monsterAttack: function() {
      const damage = this.getDamage(5, 10);
      this.heroHealth -= damage;
      this.actionLog.unshift({
        action: "monsterAttack",
        message: "Monster deals damage of " + damage + " to hero."
      });
    },

    heal: function() {
      this.heroHealth += 10;
      this.actionLog.unshift({
        action: "heroHeal",
        message: "Hero heals by 10."
      });
      this.monsterAttack();
    },

    giveUp: function() {
      this.isGameStarted = false;
    },

    getDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max), min);
    }
  }
});
