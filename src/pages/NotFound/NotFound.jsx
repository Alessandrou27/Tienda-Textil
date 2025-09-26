import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          <h1 className={styles.title}>Página no encontrada</h1>
          <p className={styles.description}>
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <div className={styles.actions}>
            <Link to="/" className={styles.primaryButton}>
              <Home size={20} />
              Ir al Inicio
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className={styles.secondaryButton}
            >
              <ArrowLeft size={20} />
              Volver Atrás
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
