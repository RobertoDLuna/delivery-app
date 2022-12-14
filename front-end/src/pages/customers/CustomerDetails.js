import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { requestData, requestUpdate } from '../../API/requests';
import DetailsTable from '../../components/DetailsTable';
import Header from '../../components/Header/Header';
import OrdersBtn from '../../components/Header/OrdersBtn';
import dataTestIds from '../../components/utils/dataTestIds';
import ProductBtn from '../../components/Header/ProductBtn';

export default function CustomerDetails({ match: { params: { id } } }) {
  const [sale, setSale] = useState();
  const [saleStatus, setSaleStatus] = useState('Pendente');

  const requestSale = async () => {
    requestData(`/customer/orders/${id}`)
      .then((data) => {
        setSale(data);
        setSaleStatus(data.status);
      });
  };

  const updateStatus = async (status) => {
    requestUpdate(`/customer/orders/${id}`, { status })
      .then((data) => setSaleStatus(data));
  };

  useEffect(() => {
    requestSale();
  }, []);
  console.log(sale);
  return (
    <main>
      <Header
        FirstNavigationLink={ ProductBtn }
        SecondNavegationLink={ OrdersBtn }
        userDataTestId="customer_products__element-navbar-user-full-name"
      />
      {sale && (
        <section>
          <div>
            <p
              data-testid={ `${dataTestIds[38]}${sale.id}` }
            >
              { sale.deliveryNumber}
            </p>
            <p
              data-testid={ `${dataTestIds[39]}${sale.id}` }
            >
              { sale.seller.name }
            </p>
            <p
              data-testid={ `${dataTestIds[40]}${sale.id}` }
            >
              { moment(sale.saleDate).format('DD/MM/YYYY')}
            </p>
            <p
              data-testid={ `${dataTestIds[41]}${sale.id}` }
            >
              { saleStatus }
            </p>
            <button
              type="button"
              data-testid={ `${dataTestIds[48]}${sale.id}` }
              disabled={ saleStatus !== 'Em Trânsito' }
              onClick={ () => updateStatus('Entregue') }
            >
              MARCAR COMO ENTREGUE
            </button>
          </div>
          <section>
            <DetailsTable data={ sale.products } />
          </section>
          <div
            data-testid={ `${dataTestIds[47]}` }
          >
            Total:
            {' '}
            { sale.totalPrice}
          </div>
        </section>
      ) }

    </main>
  );
}

CustomerDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
