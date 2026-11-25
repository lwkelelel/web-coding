<script setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import HomePage from './pages/HomePage.vue';
import CatalogPage from './pages/CatalogPage.vue';
import DetailPage from './pages/DetailPage.vue';
import CheckoutPage from './pages/CheckoutPage.vue';
import CollectionPage from './pages/CollectionPage.vue';
import { courses } from '../db.json';

const name = location.pathname.split('/').pop() || 'index.html';
const pages = {
  'index.html': HomePage, 'catalog.html': CatalogPage, 'detail.html': DetailPage,
  'checkout.html': CheckoutPage, 'collection.html': CollectionPage
};
const page = pages[name] || HomePage;
const course = new URLSearchParams(location.search).get('course');
const checkout = name === 'detail.html' && course
  ? 'checkout.html?course=' + encodeURIComponent(course) : 'checkout.html';
</script>

<template>
  <AppHeader :page="name" :checkout="checkout" />
  <CatalogPage v-if="page === CatalogPage" :items="courses" />
  <component v-else :is="page" />
  <AppFooter />
</template>
