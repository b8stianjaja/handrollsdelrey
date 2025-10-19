// src/pages/public/CheckoutPage.jsx
import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import styles from './CheckoutPage.module.css';
// Importaremos los componentes de los pasos del checkout aquí
// import DeliveryInfo from '../../components/features/checkout/DeliveryInfo';
// import OrderSummary from '../../components/features/checkout/OrderSummary';
// import PaymentInfo from '../../components/features/checkout/PaymentInfo';

/**
 * Página principal para el proceso de checkout.
 * Orquestará los diferentes pasos (información de entrega, resumen, pago).
 */
const CheckoutPage = () => {
  // (Estados futuros para manejar el paso actual, datos del formulario, etc.)

  return (
    <MainLayout>
      <div className={styles.checkoutContainer}>
        <h1 className={styles.title}>Finalizar Compra</h1>

        <div className={styles.stepsLayout}>
          {/* Columna Izquierda: Pasos del Checkout (Formularios) */}
          <div className={styles.steps}>
            <h2>Paso 1: Información de Entrega (Placeholder)</h2>
            {/* <DeliveryInfo /> */}
            <p>Formulario para nombre, teléfono, dirección, tipo de entrega (delivery/retiro) irá aquí.</p>
            
            <h2>Paso 2: Método de Pago (Placeholder)</h2>
            {/* <PaymentInfo /> */}
            <p>Selección de método de pago (Efectivo, Transferencia, futuro Webpay) irá aquí.</p>
          </div>

          {/* Columna Derecha: Resumen del Pedido */}
          <div className={styles.summary}>
            <h2>Resumen del Pedido (Placeholder)</h2>
            {/* <OrderSummary /> */}
            <p>Mostrará los items del carrito (obtenidos del context) y el total final.</p>
            <button className={styles.confirmButton}>Confirmar Pedido (Placeholder)</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;