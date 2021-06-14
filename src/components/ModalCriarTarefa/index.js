import {useState} from 'react';
import Input from '../Input';
import {api} from '../../service/api';
import {Container, Overlay} from './styles';

function CreateTask({handleClose}) {
  const [newTask, setNewTask] = useState({
    task : '',
  });
  const handleInput = (e) => {
    setNewTask({...newTask, [e.target.id]: e.target.value});
  };
  const handleAddTask = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post('/task/:cardId', {
        task : newTask.task,
      });

      setNewTask(response.data);
      handleClose();
    } catch(error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };
  return (
    <>
      <Overlay>
        <Container onSubmit={handleAddTask}>
          <span onClick={handleClose}>X</span>
          <h2>Criar uma tarefa</h2>
          <h3>Titulo da tarefa</h3>
          <Input
            id="title"
            placeholder="Digite o título do card aqui"
            value={newTask.task}
            handler={handleInput}
            required
          />
          <button>Criar uma tarefa</button>
        </Container>
      </Overlay>
    </>
  );
}

export default CreateTask;
