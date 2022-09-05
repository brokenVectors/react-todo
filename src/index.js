import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function AddForm(props) {
	const [text, changeText] = useState("");
	return <form className="form-group d-flex" onSubmit={(e) => {e.preventDefault(); props.onAdd(text)}}>
		<input className="form-control" onChange={(e) => {changeText(e.target.value)}}></input>
		<div class="input-group-append">
			<input className="btn btn-primary" type="submit" value="+"/>
		</div>
	</form>
}

function TodoElement(props) {
	/*
	return <div className="todoElement">
		<p>{props.text}</p>
		<button onClick={props.onRemove}>X</button>
	</div>
	*/
	return <ul className="list-group-item d-flex justify-content-between align-items-center">
		<p className="align-bottom">{props.text}</p>
		<button className="btn btn-danger float-right" onClick={props.onRemove}>X</button>
	</ul>
}

function TodoList() {
	const [todo, setTodo] = useState([]);
	const [didLoad, setLoaded] = useState(false);
	

	let todoSave = localStorage.getItem('todo');
	if(!didLoad && todoSave) {
		setLoaded(true);
		setTodo(JSON.parse(todoSave));
	}
	let save = () => {
		localStorage.setItem('todo', JSON.stringify(todo));
	}
	let handleAdd = (text) => {
		let newTodo = todo.map((x) => x);
		newTodo.push(text);
		setTodo(newTodo);
	};
	let handleRemove = (id) => {
		let newTodo = todo.map((x) => x);
		newTodo.splice(id, 1);
		setTodo(newTodo);
	}
	useEffect(save, [todo]);
	let elements = [];
	for(let i = 0; i < todo.length; i++) {
		elements.push(<TodoElement key={i} index={i} text={todo[i]} onRemove={() => {handleRemove(i)}} />);
	}
	return <div>
		<h1 className="text-center">Todo List</h1>
		<AddForm onAdd={handleAdd}/>
		<ul class="list-group mt-5">
			{ elements }
		</ul>
		
	</div>
}
function Page(props) {
	return <div className="center-align mt-2">
		<TodoList />
	</div>
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Page text="ok"/>);