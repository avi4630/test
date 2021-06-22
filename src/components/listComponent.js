import React, { useEffect, useState } from "react";
import fireBaseDb from "../config";
import CardComponent from "./cardComponent";
import { Button } from "react-bootstrap";


function ListComponent() {
  const [code, setCode] = useState("")
  const [qns, setQns] = useState("")
  const [a, setA] = useState("")
  const [b, setB] = useState("")
  const [c, setC] = useState("")
  const [d, setD] = useState("")
  const [ans, setAns] = useState("")
  const [quetions, setQuetions] = useState({})
  const [users, setUsers] = useState({})
  const [activeIndex, setActiveIndex] = useState("")
  const [isVerify, setIsVerify] = useState(false)
  const [name, setName] = useState("")

  const add = () => {
    fireBaseDb.child(code).set(
      {
        quetions:
        {
          ...quetions,
          [getId()]:
          {
            quetion: qns,
            a: a,
            b: b,
            c: c,
            d: d,
            ans: ans
          },
        },
      },
      err => {
        if (err) console.log(err)
      })
  }

  const getId = () => {
    let flag = true;
    let id;
    while (flag) {
      id = Math.floor(Math.random() * (99 - 1) + 1)
      if (!quetions[id]) flag = false
    }
    return id
  }
  const submitCode = () => {
    fireBaseDb.child(code).on(
      "value",
      snapshot => {
        if (snapshot.val() != null) {
          setQuetions({ ...snapshot.val().quetions })
          setUsers({ ...snapshot.val().users })
          setActiveIndex(snapshot.val().activeQns ? snapshot.val().activeQns : "")
        } else {
          setCode(code)
        }
        setIsVerify(true)
      })
  }

  const setActiveQns = (key) => {
    fireBaseDb.child(`${code}/activeQns`).set(
      key,
      err => {
        if (err) console.log(err)
      })
  }

  const onSubmitAns = (key) => {
    fireBaseDb.child(`${code}/user/`).set(
      {
        ...users,
        [name]: {
          ans: key,
          time: "30",
        }
      },
      err => {
        if (err) console.log(err)
      })
  }

  return (
    <div className="bg-secondary" style={{ height: "100vh" }}>
      {!isVerify ? <>
        <input value={code} placeholder="quetion code" onChange={(e) => setCode(e.target.value)} />
        <button onClick={submitCode}>submit code</button>
      </> :
        <div className="d-flex" style={{ height: "100vh" }}>
          <div className="col-6" >
            <input value={qns} placeholder="quetion" onChange={(e) => setQns(e.target.value)} />
            <div>
              <input value={a} placeholder="a" onChange={(e) => setA(e.target.value)} />
              <input value={b} placeholder="b" onChange={(e) => setB(e.target.value)} />
              <input value={c} placeholder="c" onChange={(e) => setC(e.target.value)} />
              <input value={d} placeholder="d" onChange={(e) => setD(e.target.value)} />
            </div>

            <input value={ans} placeholder="answer" onChange={(e) => setAns(e.target.value)} />
            <div>
              <button onClick={add}>add</button>
            </div>
            <div>
              {Object.keys(quetions).map(key => <div>
                <div>{quetions[key].quetion}</div>
                <div>
                  <span>{quetions[key].a}</span>
                  <span>{quetions[key].b}</span>
                  <span>{quetions[key].c}</span>
                  <span>{quetions[key].d}</span>
                </div>
              </div>)
              }
            </div>
            <div>
              {Object.keys(quetions).map((key, index) => <div>
                <Button className="m-3" onClick={() => setActiveQns(key)}>{index}</Button>
              </div>)
              }
            </div>
          </div>
          <div className="col-6 bg-warning">
            <div>
              <input value={name} placeholder="name" onChange={(e) => setName(e.target.value)} />
            </div>
            {activeIndex && <>
              <div>{quetions[activeIndex].quetion}</div>
              <div>
                <Button onClick={() => onSubmitAns("a")}>{quetions[activeIndex].a}</Button>
                <Button onClick={() => onSubmitAns("b")}>{quetions[activeIndex].b}</Button>
                <Button onClick={() => onSubmitAns("c")}>{quetions[activeIndex].c}</Button>
                <Button onClick={() => onSubmitAns("d")}>{quetions[activeIndex].d}</Button>
              </div>
            </>}
          </div>
        </div>
      }
    </div>
  )
}

export default ListComponent;
