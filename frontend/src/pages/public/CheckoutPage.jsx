// src/pages/public/CheckoutPage.jsx
import React from 'react'; 
import MainLayout from '../../components/layout/MainLayout';
import styles from './CheckoutPage.module.css';
import CheckoutProgress from '../../components/features/checkout/CheckoutProgress';
import OrderSummary from '../../components/features/checkout/OrderSummary'; 
import DeliveryInfo from '../../components/features/checkout/DeliveryInfo'; 
import PaymentInfo from '../../components/features/checkout/PaymentInfo';

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = React.useState(1); 
  const [isDeliveryValid, setIsDeliveryValid] = React.useState(false); 
  // Opcional: estado para guardar los datos
  const [deliveryData, setDeliveryData] = React.useState({});
  
  // 1. Estado para la validez del Paso 2
  const [isPaymentValid, setIsPaymentValid] = React.useState(false); 
  const [paymentMethod, setPaymentMethod] = React.useState(''); 

  // Callback para recibir la validez y los datos del formulario de entrega
  const handleDeliveryValidityChange = (isValid, data) => {
    setIsDeliveryValid(isValid);
    setDeliveryData(data); 
  };
  
  // 2. Callback para recibir la validez y los datos del formulario de pago
  const handlePaymentValidityChange = (isValid, method) => {
      setIsPaymentValid(isValid);
      setPaymentMethod(method);
  };
  
  // Lógica para avanzar al siguiente paso (solo se usa en el paso 1)
  const handleNextStep = () => {
      if (currentStep === 1 && isDeliveryValid) {
          setCurrentStep(2);
      }
  };
  
  // 3. Manejador para el botón final de confirmación
  const handleConfirmOrder = () => {
      if (currentStep === 2 && isPaymentValid) {
          // Aquí se enviaría la data al backend (deliveryData, paymentMethod, cart items, etc.)
          console.log("¡Pedido Confirmado!");
          console.log("Datos de Entrega:", deliveryData);
          console.log("Método de Pago:", paymentMethod);
          // Redireccionar a la página de confirmación real
      }
  };


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
                <DeliveryInfo onValidityChange={handleDeliveryValidityChange} /> 
                
                <div className={styles.stepNavigation}>
                   <span></span> 
                   <button 
                       onClick={handleNextStep} 
                       className={styles.nextStepButton}
                       disabled={!isDeliveryValid} 
                    >
                        Siguiente: Pago
                    </button> 
                </div>
              </>
            )}
            
            {currentStep === 2 && (
             <>
                <h2>Paso 2: Método de Pago</h2>
                {/* 4. Pasar la función de callback al componente PaymentInfo */}
                <PaymentInfo onValidityChange={handlePaymentValidityChange} /> 
                
                <div className={styles.stepNavigation}>
                   <button onClick={() => setCurrentStep(1)} className={styles.prevStepButton}>Volver a Entrega</button>
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
              // 5. El botón de confirmar se habilita solo si estamos en el paso 2 Y el pago es válido
              disabled={currentStep !== 2 || !isPaymentValid} 
              onClick={handleConfirmOrder}
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