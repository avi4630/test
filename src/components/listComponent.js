import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { firebaseConfig } from "../config";
import "firebase/database";
import CardComponent from "./cardComponent";

firebase.initializeApp(firebaseConfig);

function ListComponent() {
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const getAccounts = (account) => {
    return accounts.find(item => item.accountId === account);
  };

  const setAccount = (account) => {
    const arr = Object.entries(account.apps);
    return arr.map((app) => ({ name: app[0], title: app[1].title }));
  };

  useEffect(() => {
    const database = firebase.database().ref();
    database.on("value", data => {
      setUsers(Object.entries(data.val().users).map((e) => ({
        userId: e[0],
        userInfo: e[1]
      })))
      setAccounts(Object.entries(data.val().accounts).map((e) => ({
        accountId: e[0],
        apps: setAccount(e[1])
      })));
    });
  }, []);

  const RenderList = () => {
    return (
      users.map((user) => (
        <CardComponent
          key={user.userId}
          name={user.userInfo.name}
          account={getAccounts(user.userInfo.account)} />
      ))
    )
  };

  return (
    <div className="bg-dark p-2">
      <h1 className="font-weight-bold text-danger "> User List </h1>
      <RenderList />
    </div>
  )
}

export default ListComponent;
