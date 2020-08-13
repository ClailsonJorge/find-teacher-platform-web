import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import './styles.css';
import warningIcon from '../../assets/images/icons/warning.svg';
import api from '../../services/api';

const TeacherForm = () => {
  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const handleCreateClass = (event: FormEvent) => {
    event.preventDefault();
    api
      .post('/classes', {
        name,
        avatar,
        whatsapp,
        bio,
        cost: Number(cost),
        subject,
        schedule: scheduleItems,
      })
      .then(() => {
        alert('cadastro ok');
        history.push('/');
      })
      .catch(() => {
        alert('erro no cadastro');
      });
  };

  const setScheduleItemValue = (
    position: number,
    field: string,
    value: string
  ) => {
    const newArray = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {
          ...scheduleItem,
          [field]: value,
        };
      }

      return scheduleItem;
    });
    setScheduleItems(newArray);
  };
  const addNewScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: '',
        to: '',
      },
    ]);
  };

  return (
    <div id='page-teacher-form' className='container'>
      <PageHeader
        title='Que incrível que você quer dar aulas.'
        description='O primeiro passa é preencher esse formulario de inscrição'
      />
      <main>
        <form action=''>
          <fieldset>
            <legend>Seus Dados</legend>

            <Input
              name='name'
              label='Nome completo'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name='avatar'
              label='Avatar'
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              name='whatsapp'
              label='Whatsapp'
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name='bio'
              label='Biografia'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name='subject'
              label='Matéria'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Java', label: 'Java' },
                { value: 'JS', label: 'JS' },
                { value: 'Pyton', label: 'pyton' },
                { value: 'Ruby', label: 'Ruby' },
                { value: 'CPP', label: 'CPP' },
              ]}
            />
            <Input
              name='cost'
              label='Custo da sua hora aula'
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type='button' onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div className='schedule-item' key={index}>
                <Select
                  name='week_day'
                  label='Dia da semana'
                  value={scheduleItem.week_day}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'week_day', e.target.value)
                  }
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda' },
                    { value: '2', label: 'Terça' },
                    { value: '3', label: 'Quarta' },
                    { value: '4', label: 'Quinta' },
                    { value: '5', label: 'Sexta' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />
                <Input
                  name='from'
                  label='Das'
                  type='time'
                  value={scheduleItem.from}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'from', e.target.value)
                  }
                />
                <Input
                  name='to'
                  label='Até'
                  type='time'
                  value={scheduleItem.to}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'to', e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt='Aviso importante' />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type='submit' onClick={handleCreateClass}>
              Salvar
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
