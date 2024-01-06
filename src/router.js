import { createRouter, createWebHashHistory } from 'vue-router';
import ClaimForm from "./components/ClaimForm.vue";
import HomeComponent from "./components/HomeComponent.vue";
import InspectionReportForm from "./components/InspectionReportForm.vue";
import ApartInspectionChecklist from "./components/ApartInspectionChecklist.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/homeComponent', component: HomeComponent, alias: '/' },
    { path: '/claimForm', component: ClaimForm },
    { path: '/inspectionReportForm', component: InspectionReportForm },
    { path: '/apartInspectionChecklist', component: ApartInspectionChecklist }
  ]
})
