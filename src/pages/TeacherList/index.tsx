import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Select from '../../components/Select';

import './styles.css';
import Input from '../../components/Input';
import api from '../../services/api';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  const searchTeachers = async (event: FormEvent) => {
    event.preventDefault();
    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setTeachers(response.data);
  };

  return (
    <div id='page-teacher-list' className='container'>
      <PageHeader title='Estes são os Proffys disponíveis.'>
        <form id='search-teachers' onSubmit={searchTeachers}>
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
          <Select
            name='week_day'
            label='Dia da semana'
            value={week_day}
            onChange={(e) => setWeek_day(e.target.value)}
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
            type='time'
            name='time'
            label='hora'
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button type='submit'>Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
