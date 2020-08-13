import React from 'react';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import { Link } from 'react-router-dom';

import './styles.css';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  children,
  description,
}) => {
  return (
    <header className='page-header'>
      <div className='top-bar-container'>
        <Link to='/'>
          <img src={backIcon} alt='Voltar' />
        </Link>
        <img src={logoImg} alt='Proffy' />
      </div>
      <div className='header-content'>
        <strong>{title}</strong>
        <div>
          {description && <p>{description}</p>}
          {children}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
