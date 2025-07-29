import stockShareReportChartInit from '../theme/charts/echarts/stock-share-report-chart';
import dividendsBarChartInit from '../theme/charts/echarts/dividends-bar-chart';
import dividendsGrowthChartInit from '../theme/charts/echarts/dividends-growth-chart';
import revenueThisYearChartInit from '../theme/charts/echarts/revenue-this-year-chart';
import revenueNextYearInit from '../theme/charts/echarts/revenue-next-year';
import epsThisYearChartInit from '../theme/charts/echarts/eps-this-year-chart';
import epsNextYearChartInit from '../theme/charts/echarts/eps-next-year-chart';
import forecastOfRevenueChartInit from '../theme/charts/echarts/forecast-of-revenue-chart';
import growthInRevenueChartInit from '../theme/charts/echarts/growth-in-revenue-chart';
import companyProfileEmployeesChartInit from '../theme/charts/echarts/company-profile-employees-chart';

const { docReady } = window.phoenix.utils;

docReady(stockShareReportChartInit);
docReady(dividendsBarChartInit);
docReady(dividendsGrowthChartInit);
docReady(revenueThisYearChartInit);
docReady(revenueNextYearInit);
docReady(epsThisYearChartInit);
docReady(epsNextYearChartInit);
docReady(forecastOfRevenueChartInit);
docReady(growthInRevenueChartInit);
docReady(companyProfileEmployeesChartInit);
