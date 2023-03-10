const { useState, useEffect, useContext, useRef } = React;



function App() {

    const LOCAL_STORAGE_KEY = 'expensesApp.expenses'

    const [userInput, setUserInput] = useState('')
    const [homeExpenseInput, setHomeExpenseInput] = useState('')
    const [ownExpenseInput, setOwnExpenseInput] = useState('')
    const [expenses, setExpenses] = useState([])
    const expenseTotal = homeExpenseInput + ownExpenseInput

    const [isEditing, setIsEditing] = useState(false);
    const [currentExpense, setCurrentExpense] = useState();

    const [initId, setId] = useState(0)
    const incrementCount = () => {
        setId(initId + 1);
      };

    // useEffect(() => {
    //     const storedExpenses = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    //     if (storedExpenses) setExpenses(storedExpenses)
    //   }, [])

    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses))
    //   },

    //   [expenses])

    useEffect(()=>{incrementCount()}, [expenses])
    
    // const handleTotalAmmountInput = (e) => {
    //     setUserInput(e.target.value)     
    // }

    const handleHomeExpenseInput = (e) => {
        setHomeExpenseInput(e.target.value)     
    }

    const handleOwnExpenseInput = (e) => {
        setOwnExpenseInput(e.target.value)     
    }

    const handleClick = (e)=> {
        e.preventDefault()
        const d = new Date();
        let month = String(d.getMonth()+1).padStart(2, '0');
        let date = String(d.getDate()).padStart(2, '0');
        let year = d.getFullYear()
        // if (homeExpenseInput || ownExpenseInput === '') {return null}      
        setExpenses([...expenses, {id: initId, homeExpense: homeExpenseInput, ownExpense: ownExpenseInput, date: date, month: month, year: year, active: false}])
        // setUserInput('')
        setHomeExpenseInput('')
        setOwnExpenseInput('')

    }

    const handleEditClick = (arg) => {
        setIsEditing(prevCheck => !prevCheck)
        expenses.map(x=>x.id === arg.id ? x.active = true : x.active = false)
        setCurrentExpense({...arg})
        console.log(expenses)
    }

    const handleEditInput = (e) => {
        setCurrentExpense({...currentExpense, ammount: e.target.value})
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        handleUpdateExpense(currentExpense.id, currentExpense);
    }

    function handleUpdateExpense(id, updatedExpense) {

        const updatedItem = expenses.map((expense) => {
          return expense.id === id ? updatedExpense : expense;
        });
        setIsEditing(false);
        setExpenses(updatedItem);
      }

    function handleExpenseDelete(id) {
        const updatedItem = expenses.filter((expense) => {
            return expense.id !== id;
          });
        setExpenses(updatedItem);
    }

    const [monthButtonValue, setMonthButtonValue] = useState('01')

    const sumOfHomeExpense = expenses.reduce((a, b) => Number(a) + Number(b.homeExpense), 0)
    const sumOfOwnExpense = expenses.reduce((a, b) => Number(a) + Number(b.ownExpense), 0)
    const sumTotal = sumOfHomeExpense + sumOfOwnExpense

    const filtered = expenses.filter(x=> x.month == monthButtonValue)
    const sumOfHomeExpenseFiltered = expenses.reduce((a, b) => Number(a) + Number(b.homeExpense), 0)
    const sumOfOwnExpenseFiltered = expenses.reduce((a, b) => Number(a) + Number(b.ownExpense), 0)
    const sumTotalFiltered = sumOfHomeExpenseFiltered + sumOfOwnExpenseFiltered

    const sumPerJanuary = filtered.reduce((a, b) => Number(a) + Number(b.homeExpense), 0)

    const [monthActive, setMonthActive] = useState(false)
    
    const showMonthExpenses = (e)=>{
        //   setMonthActive(x=>!x)
          setMonthActive(true)
          setMonthButtonValue(e.target.value)
    }

    const monthNames = ["?????????????? ??????????", "????????????", "??????????????", "????????", "????????????", "??????", "????????",
    "????????", "????????????", "????????????????", "??????????????", "????????????", "??????????????"
    ];



return <main>
    <form onSubmit = {handleClick}>
    <fieldset>
        <legend>??????. ????????????:</legend>
        {/* <label htmlFor="homeExpense">??????. ????????????:</label> */}
        <input value={homeExpenseInput} type="number" id="homeExpense" name="homeExpense" placeholder="enter the ammout" onChange={handleHomeExpenseInput}/><br/>
        </fieldset>
    <fieldset>
        <legend>???? ??????????????????:</legend>
        {/* <label htmlFor="ownExpense">???? ??????????????????:</label> */}
        <input value={ownExpenseInput} type="number" id="ownExpense" name="ownExpense" placeholder="enter the ammout" onChange={handleOwnExpenseInput}/><br/>
        <input type="submit" value="Submit"/>
    </fieldset>
    </form>
    <section>
        <div className='total-container'>
        <div className='circle'>{sumTotal}</div>
        {expenses.slice(0).slice(-5).reverse().map((x, index)=>{
            let thisId = x.id
        return <div key={index}>
            <p>??????. ????????????: {x.homeExpense} ???? ??????????????????: {x.ownExpense} Date: {x.date}/{x.month}/{x.year}  ID: {x.id}</p>
            <button onClick={()=>handleEditClick(x)}>click</button>
            {isEditing? <form onSubmit={handleEditSubmit} style={x.active? { display: 'block'} : {display: 'none'}}><input type='text' onChange={handleEditInput}/>
            <input type='submit'/></form> : null}
            <button onClick={()=>handleExpenseDelete(thisId)}>delete</button>
            </div> 
        })}
        </div>
    </section>
    <section>
        <button value = '01' onClick={showMonthExpenses}>??????</button>
        <button value = '02' onClick={showMonthExpenses}>??????</button>
        <button value = '03' onClick={showMonthExpenses}>??????</button>
        <button value = '04' onClick={showMonthExpenses}>??????</button>
        <button value = '05' onClick={showMonthExpenses}>??????</button>
        <button value = '06' onClick={showMonthExpenses}>??????</button>
        <br></br>
        <button value = '07' onClick={showMonthExpenses}>??????</button>
        <button value = '08' onClick={showMonthExpenses}>??????</button>
        <button value = '09' onClick={showMonthExpenses}>??????</button>
        <button value = '10' onClick={showMonthExpenses}>??????</button>
        <button value = '11' onClick={showMonthExpenses}>??????</button>       
        <button value = '12' onClick={showMonthExpenses}>??????</button>

        {monthActive? <h1>???????????? ???? {monthNames[Number(monthButtonValue)]}: {sumTotalFiltered}</h1> : null}
    </section>
    <form action="/action_page.php">
  <label for="cars">Choose a car:</label>
  <select name="cars" id="cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select>
  <br></br>
  <input type="submit" value="Submit"/>
</form>
    </main>

}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
