// 戻り禁止
window.location.hash = "#noback";
window.onhashchange = function () {
  window.location.hash = "#noback";
};

let bgstar = new Vue({
  el: "#bgstar",
  data: {
    items: [{
        bg: '<div class="stars"></div>'
      },
      {
        bg: '<div class="twinkling"></div>'
      },
      {
        bg: '<div class="clouds"></div>'
      }
    ]
  }
});

let loginregist = new Vue({
  el: "#main",
  data: {
    loginChange: msgAns,
    changeBtn: msgAns,
    error: msgAns,
    createBtn: 'Create Account',
    spase: '<p class="spacc">スペース</p>',
    // ログイン
    loginItems: [{
      input: `<td>
                <input type="text" name="user" id="user" class="far" placeholder="&#xf2bb; ユーザID" autocomplete="off" required>
              </td>` //ユーザID
    }, {
      input: `<td class="passMa">
                <input type="password" name="passwd" id="passwd" class="far" placeholder="&#xf11c; パスワード" autocomplete="off" required required minlength="4">
              </td>` // パスワード
    }, {
      input: `<td>
                <input type="submit" name="login" value="Lift-Off" id="login">
              </td>` // ログインボタン
    }, {
      input: `<td id="or">---------  or  ---------</td>` // or
    }],
    // アカウント作成
    registItems: [{
      input: `<td>
                <input type="text" name="user" id="userRegist" class="far" placeholder="&#xf2bb; ユーザID" autocomplete="off" required>
              </td>` // ユーザID
    }, {
      input: `<td>
                <input type="password" name="passwd" id="passwdRegist" class="far" placeholder="&#xf11c; パスワード(4文字以上)" autocomplete="off" required minlength="4">
              </td>` // パスワード
    }, {
      input: `<td>
                <input type="text" name="username" id="name" class="fas" placeholder="&#xf007; ユーザネーム(5文字以下)" autocomplete="off" required pattern=".{1,5}">
              </td>` // ユーザネーム
    }, {
      input: `<td>
                <input type="submit" name="regist" value="Sign Up" id="regist">
              </td>` // 作成ボタン
    }],
  },
  methods: {
    change: function () {
      this.loginChange = !this.loginChange
      headerChange.titleChange = !headerChange.titleChange
      this.changeBtn = !this.changeBtn
      this.error = !this.error
    },
  }
});

let headerChange = new Vue({
  el: "#head",
  data: {
    titleChange: msgAns,
    titleImg: '<img src="../images/rogo.png" alt="SSI">',
  },
  methods: {
    headerChange: function () {
      loginregist.loginChange = !loginregist.loginChange
      loginregist.changeBtn = !loginregist.changeBtn
      loginregist.error = !loginregist.error
      this.titleChange = !this.titleChange
    }
  }
});
