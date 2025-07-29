import bookingValueChartInit from '../theme/charts/echarts/booking-value-chart';
import bookingsChartInit from '../theme/charts/echarts/bookings-chart';
import cancelBookingChartInit from '../theme/charts/echarts/cancel-booking-chart';
import commissionChartInit from '../theme/charts/echarts/commission-chart';
import countryWiseVisitorsChartInit from '../theme/charts/echarts/country-wise-visitors-chart';
import financialActivitiesChartInit from '../theme/charts/echarts/financial-activities-chart';
import grossProfitInit from '../theme/charts/echarts/gross-profit';
import holidaysNextMonthChartInit from '../theme/charts/echarts/holidays-next-month';
import flightMapInit from '../theme/flight-map';

const { docReady } = window.phoenix.utils;

docReady(bookingValueChartInit);
docReady(commissionChartInit);
docReady(cancelBookingChartInit);
docReady(countryWiseVisitorsChartInit);
docReady(financialActivitiesChartInit);
docReady(holidaysNextMonthChartInit);
docReady(bookingsChartInit);
docReady(grossProfitInit);
docReady(flightMapInit);
