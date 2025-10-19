// src/pages/public/CheckoutPage.jsx
import React from 'react'; 
import MainLayout from '../../components/layout/MainLayout';
import styles from './CheckoutPage.module.css';
import CheckoutProgress from '../../components/features/checkout/CheckoutProgress';
import OrderSummary from '../../components/features/checkout/OrderSummary'; 
// import DeliveryInfo from '../../components/features/checkout/DeliveryInfo';
// import PaymentInfo from '../../components/features/checkout/PaymentInfo';

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = React.useState(1); 

  return (
    <MainLayout>
      <div className={styles.checkoutContainer}>
        <h1 className={styles.title}>Finalizar Compra</h1>
        <CheckoutProgress currentStep={currentStep} />

        <div className={styles.stepsLayout}>
          <div className={styles.steps}>
            {currentStep === 1 && (
              <>
                <h2>Paso 1: Información de Entrega</h2>
                {/* <DeliveryInfo /> */}
                <p>Formulario...</p>
                {/* **NUEVO:** Contenedor para botones */}
                <div className={styles.stepNavigation}>
                   {/* Vacío para alinear a la derecha en desktop */}
                   <span></span> 
                   <button onClick={() => setCurrentStep(2)} className={styles.nextStepButton}>Siguiente: Pago</button> 
                </div>
              </>
            )}
            
            {currentStep === 2 && (
             <>
                <h2>Paso 2: Método de Pago</h2>
                {/* <PaymentInfo /> */}
                <p>Selección de método...</p>
                 {/* **NUEVO:** Contenedor para botones */}
                <div className={styles.stepNavigation}>
                   <button onClick={() => setCurrentStep(1)} className={styles.prevStepButton}>Volver a Entrega</button>
                   {/* Vacío para alinear a la izquierda en desktop */}
                   <span></span> 
                </div>
             </>
            )}
          </div>

          <div className={styles.summary}>
            <h2>Resumen del Pedido</h2>
            <OrderSummary /> 
            <button 
              className={styles.confirmButton} 
              disabled={currentStep !== 2} 
            >
              Confirmar Pedido 
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;