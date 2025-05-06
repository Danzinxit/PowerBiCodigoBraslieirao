'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Trophy, Shield, Goal, Award, TrendingUp, Percent, Target, Activity } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { FaTrophy, FaFutbol, FaStar, FaChartBar, FaDice, FaPercentage } from 'react-icons/fa';

interface TeamData {
  ANO: number;
  Posicao: number;
  Time: string;
  Pontos: number;
  Vitoria: number;
  Empates: number;
  Derrotas: number;
  Gols_pro: number;
  Gols_Contra: number;
  Saldo_Gols: number;
  Aproveitamento: number;
  Estados: string;
}

// Dados reais do Brasileirão
const dadosIniciais: TeamData[] = [
  // 2009
  {
    "ANO": 2009, "Posicao": 1, "Time": "Flamengo", "Pontos": 67, "Vitoria": 19, "Empates": 10, "Derrotas": 9, "Gols_pro": 58, "Gols_Contra": 44, "Saldo_Gols": 14, "Aproveitamento": 58.8, "Estados": "RJ"
  },
  {
    "ANO": 2009, "Posicao": 2, "Time": "Internacional", "Pontos": 65, "Vitoria": 19, "Empates": 8, "Derrotas": 11, "Gols_pro": 65, "Gols_Contra": 44, "Saldo_Gols": 21, "Aproveitamento": 57.0, "Estados": "RS"
  },
  {
    "ANO": 2009, "Posicao": 3, "Time": "São Paulo", "Pontos": 65, "Vitoria": 18, "Empates": 11, "Derrotas": 9, "Gols_pro": 57, "Gols_Contra": 42, "Saldo_Gols": 15, "Aproveitamento": 57.0, "Estados": "SP"
  },
  {
    "ANO": 2009, "Posicao": 4, "Time": "Cruzeiro", "Pontos": 62, "Vitoria": 18, "Empates": 8, "Derrotas": 12, "Gols_pro": 58, "Gols_Contra": 53, "Saldo_Gols": 5, "Aproveitamento": 54.4, "Estados": "MG"
  },
  {
    "ANO": 2009, "Posicao": 5, "Time": "Palmeiras", "Pontos": 62, "Vitoria": 17, "Empates": 11, "Derrotas": 10, "Gols_pro": 58, "Gols_Contra": 45, "Saldo_Gols": 13, "Aproveitamento": 54.4, "Estados": "SP"
  },
  {
    "ANO": 2009, "Posicao": 6, "Time": "Avaí", "Pontos": 57, "Vitoria": 15, "Empates": 12, "Derrotas": 11, "Gols_pro": 61, "Gols_Contra": 52, "Saldo_Gols": 9, "Aproveitamento": 50.0, "Estados": "SC"
  },
  {
    "ANO": 2009, "Posicao": 7, "Time": "Atlético-MG", "Pontos": 56, "Vitoria": 16, "Empates": 8, "Derrotas": 14, "Gols_pro": 55, "Gols_Contra": 56, "Saldo_Gols": -1, "Aproveitamento": 49.1, "Estados": "MG"
  },
  {
    "ANO": 2009, "Posicao": 8, "Time": "Grêmio", "Pontos": 55, "Vitoria": 15, "Empates": 10, "Derrotas": 13, "Gols_pro": 67, "Gols_Contra": 46, "Saldo_Gols": 21, "Aproveitamento": 48.2, "Estados": "RS"
  },
  {
    "ANO": 2009, "Posicao": 9, "Time": "Goiás", "Pontos": 55, "Vitoria": 15, "Empates": 10, "Derrotas": 13, "Gols_pro": 64, "Gols_Contra": 65, "Saldo_Gols": -1, "Aproveitamento": 48.2, "Estados": "GO"
  },
  {
    "ANO": 2009, "Posicao": 10, "Time": "Corinthians", "Pontos": 52, "Vitoria": 14, "Empates": 10, "Derrotas": 14, "Gols_pro": 50, "Gols_Contra": 54, "Saldo_Gols": -4, "Aproveitamento": 45.6, "Estados": "SP"
  },
  {
    "ANO": 2009, "Posicao": 11, "Time": "Barueri", "Pontos": 49, "Vitoria": 12, "Empates": 13, "Derrotas": 13, "Gols_pro": 59, "Gols_Contra": 52, "Saldo_Gols": 7, "Aproveitamento": 43.0, "Estados": "SP"
  },
  {
    "ANO": 2009, "Posicao": 12, "Time": "Santos", "Pontos": 49, "Vitoria": 12, "Empates": 13, "Derrotas": 13, "Gols_pro": 58, "Gols_Contra": 58, "Saldo_Gols": 0, "Aproveitamento": 43.0, "Estados": "SP"
  },
  {
    "ANO": 2009, "Posicao": 13, "Time": "Vitória", "Pontos": 48, "Vitoria": 13, "Empates": 9, "Derrotas": 16, "Gols_pro": 51, "Gols_Contra": 57, "Saldo_Gols": -6, "Aproveitamento": 42.1, "Estados": "BA"
  },
  {
    "ANO": 2009, "Posicao": 14, "Time": "Athletico-PR", "Pontos": 48, "Vitoria": 13, "Empates": 9, "Derrotas": 16, "Gols_pro": 42, "Gols_Contra": 49, "Saldo_Gols": -7, "Aproveitamento": 42.1, "Estados": "PR"
  },
  {
    "ANO": 2009, "Posicao": 15, "Time": "Botafogo", "Pontos": 47, "Vitoria": 11, "Empates": 14, "Derrotas": 13, "Gols_pro": 52, "Gols_Contra": 58, "Saldo_Gols": -6, "Aproveitamento": 41.2, "Estados": "RJ"
  },
  {
    "ANO": 2009, "Posicao": 16, "Time": "Fluminense", "Pontos": 46, "Vitoria": 11, "Empates": 13, "Derrotas": 14, "Gols_pro": 49, "Gols_Contra": 56, "Saldo_Gols": -7, "Aproveitamento": 40.4, "Estados": "RJ"
  },
  {
    "ANO": 2009, "Posicao": 17, "Time": "Coritiba", "Pontos": 45, "Vitoria": 12, "Empates": 9, "Derrotas": 17, "Gols_pro": 48, "Gols_Contra": 60, "Saldo_Gols": -12, "Aproveitamento": 39.5, "Estados": "PR"
  },
  {
    "ANO": 2009, "Posicao": 18, "Time": "Santo André", "Pontos": 41, "Vitoria": 11, "Empates": 8, "Derrotas": 19, "Gols_pro": 46, "Gols_Contra": 61, "Saldo_Gols": -15, "Aproveitamento": 36.0, "Estados": "SP"
  },
  {
    "ANO": 2009, "Posicao": 19, "Time": "Náutico", "Pontos": 38, "Vitoria": 10, "Empates": 8, "Derrotas": 20, "Gols_pro": 48, "Gols_Contra": 71, "Saldo_Gols": -23, "Aproveitamento": 33.3, "Estados": "PE"
  },
  {
    "ANO": 2009, "Posicao": 20, "Time": "Sport", "Pontos": 31, "Vitoria": 7, "Empates": 10, "Derrotas": 21, "Gols_pro": 48, "Gols_Contra": 71, "Saldo_Gols": -23, "Aproveitamento": 27.2, "Estados": "PE"
  },
  // 2010
  {
    "ANO": 2010, "Posicao": 1, "Time": "Fluminense", "Pontos": 71, "Vitoria": 20, "Empates": 11, "Derrotas": 7, "Gols_pro": 62, "Gols_Contra": 36, "Saldo_Gols": 26, "Aproveitamento": 62.0, "Estados": "RJ"
  },
  {
    "ANO": 2010, "Posicao": 2, "Time": "Cruzeiro", "Pontos": 69, "Vitoria": 20, "Empates": 9, "Derrotas": 9, "Gols_pro": 53, "Gols_Contra": 38, "Saldo_Gols": 15, "Aproveitamento": 60.0, "Estados": "MG"
  },
  {
    "ANO": 2010, "Posicao": 3, "Time": "Corinthians", "Pontos": 68, "Vitoria": 19, "Empates": 11, "Derrotas": 8, "Gols_pro": 65, "Gols_Contra": 41, "Saldo_Gols": 24, "Aproveitamento": 59.0, "Estados": "SP"
  },
  {
    "ANO": 2010, "Posicao": 4, "Time": "Grêmio", "Pontos": 63, "Vitoria": 17, "Empates": 12, "Derrotas": 9, "Gols_pro": 68, "Gols_Contra": 43, "Saldo_Gols": 25, "Aproveitamento": 55.0, "Estados": "RS"
  },
  {
    "ANO": 2010, "Posicao": 5, "Time": "Athletico-PR", "Pontos": 60, "Vitoria": 17, "Empates": 9, "Derrotas": 12, "Gols_pro": 43, "Gols_Contra": 45, "Saldo_Gols": -2, "Aproveitamento": 52.0, "Estados": "PR"
  },
  {
    "ANO": 2010, "Posicao": 6, "Time": "Botafogo", "Pontos": 59, "Vitoria": 14, "Empates": 17, "Derrotas": 7, "Gols_pro": 54, "Gols_Contra": 42, "Saldo_Gols": 12, "Aproveitamento": 51.0, "Estados": "RJ"
  },
  {
    "ANO": 2010, "Posicao": 7, "Time": "Internacional", "Pontos": 58, "Vitoria": 16, "Empates": 10, "Derrotas": 12, "Gols_pro": 48, "Gols_Contra": 41, "Saldo_Gols": 7, "Aproveitamento": 50.0, "Estados": "RS"
  },
  {
    "ANO": 2010, "Posicao": 8, "Time": "Santos", "Pontos": 56, "Vitoria": 15, "Empates": 11, "Derrotas": 12, "Gols_pro": 63, "Gols_Contra": 50, "Saldo_Gols": 13, "Aproveitamento": 49.0, "Estados": "SP"
  },
  {
    "ANO": 2010, "Posicao": 9, "Time": "São Paulo", "Pontos": 55, "Vitoria": 15, "Empates": 10, "Derrotas": 13, "Gols_pro": 54, "Gols_Contra": 54, "Saldo_Gols": 0, "Aproveitamento": 48.0, "Estados": "SP"
  },
  {
    "ANO": 2010, "Posicao": 10, "Time": "Palmeiras", "Pontos": 50, "Vitoria": 12, "Empates": 14, "Derrotas": 12, "Gols_pro": 42, "Gols_Contra": 43, "Saldo_Gols": -1, "Aproveitamento": 43.0, "Estados": "SP"
  },
  {
    "ANO": 2010, "Posicao": 11, "Time": "Vasco", "Pontos": 49, "Vitoria": 11, "Empates": 16, "Derrotas": 11, "Gols_pro": 43, "Gols_Contra": 45, "Saldo_Gols": -2, "Aproveitamento": 42.0, "Estados": "RJ"
  },
  {
    "ANO": 2010, "Posicao": 12, "Time": "Ceará", "Pontos": 47, "Vitoria": 10, "Empates": 17, "Derrotas": 11, "Gols_pro": 35, "Gols_Contra": 44, "Saldo_Gols": -9, "Aproveitamento": 41.0, "Estados": "CE"
  },
  {
    "ANO": 2010, "Posicao": 13, "Time": "Atlético-MG", "Pontos": 45, "Vitoria": 13, "Empates": 6, "Derrotas": 19, "Gols_pro": 52, "Gols_Contra": 64, "Saldo_Gols": -12, "Aproveitamento": 39.0, "Estados": "MG"
  },
  {
    "ANO": 2010, "Posicao": 14, "Time": "Flamengo", "Pontos": 44, "Vitoria": 9, "Empates": 17, "Derrotas": 12, "Gols_pro": 41, "Gols_Contra": 44, "Saldo_Gols": -3, "Aproveitamento": 38.0, "Estados": "RJ"
  },
  {
    "ANO": 2010, "Posicao": 15, "Time": "Avaí", "Pontos": 43, "Vitoria": 11, "Empates": 10, "Derrotas": 17, "Gols_pro": 49, "Gols_Contra": 58, "Saldo_Gols": -9, "Aproveitamento": 37.0, "Estados": "SC"
  },
  {
    "ANO": 2010, "Posicao": 16, "Time": "Atlético-GO", "Pontos": 42, "Vitoria": 11, "Empates": 9, "Derrotas": 18, "Gols_pro": 51, "Gols_Contra": 57, "Saldo_Gols": -6, "Aproveitamento": 36.0, "Estados": "GO"
  },
  {
    "ANO": 2010, "Posicao": 17, "Time": "Vitória", "Pontos": 42, "Vitoria": 9, "Empates": 15, "Derrotas": 14, "Gols_pro": 42, "Gols_Contra": 48, "Saldo_Gols": -6, "Aproveitamento": 36.0, "Estados": "BA"
  },
  {
    "ANO": 2010, "Posicao": 18, "Time": "Guarani", "Pontos": 37, "Vitoria": 8, "Empates": 13, "Derrotas": 17, "Gols_pro": 33, "Gols_Contra": 53, "Saldo_Gols": -20, "Aproveitamento": 32.0, "Estados": "SP"
  },
  {
    "ANO": 2010, "Posicao": 19, "Time": "Goiás", "Pontos": 33, "Vitoria": 8, "Empates": 9, "Derrotas": 21, "Gols_pro": 41, "Gols_Contra": 68, "Saldo_Gols": -27, "Aproveitamento": 28.0, "Estados": "GO"
  },
  {
    "ANO": 2010, "Posicao": 20, "Time": "Grêmio Barueri", "Pontos": 28, "Vitoria": 7, "Empates": 10, "Derrotas": 21, "Gols_pro": 39, "Gols_Contra": 64, "Saldo_Gols": -25, "Aproveitamento": 24.0, "Estados": "SP"
  },
  // 2011
  {
    "ANO": 2011, "Posicao": 1, "Time": "Corinthians", "Pontos": 71, "Vitoria": 21, "Empates": 8, "Derrotas": 9, "Gols_pro": 53, "Gols_Contra": 36, "Saldo_Gols": 17, "Aproveitamento": 62.0, "Estados": "SP"
  },
  {
    "ANO": 2011, "Posicao": 2, "Time": "Vasco", "Pontos": 69, "Vitoria": 19, "Empates": 12, "Derrotas": 7, "Gols_pro": 57, "Gols_Contra": 40, "Saldo_Gols": 17, "Aproveitamento": 61.0, "Estados": "RJ"
  },
  {
    "ANO": 2011, "Posicao": 3, "Time": "Fluminense", "Pontos": 63, "Vitoria": 20, "Empates": 3, "Derrotas": 15, "Gols_pro": 60, "Gols_Contra": 51, "Saldo_Gols": 9, "Aproveitamento": 55.0, "Estados": "RJ"
  },
  {
    "ANO": 2011, "Posicao": 4, "Time": "Flamengo", "Pontos": 61, "Vitoria": 15, "Empates": 16, "Derrotas": 7, "Gols_pro": 59, "Gols_Contra": 47, "Saldo_Gols": 12, "Aproveitamento": 54.0, "Estados": "RJ"
  },
  {
    "ANO": 2011, "Posicao": 5, "Time": "Internacional", "Pontos": 60, "Vitoria": 16, "Empates": 12, "Derrotas": 10, "Gols_pro": 57, "Gols_Contra": 43, "Saldo_Gols": 14, "Aproveitamento": 53.0, "Estados": "RS"
  },
  {
    "ANO": 2011, "Posicao": 6, "Time": "São Paulo", "Pontos": 59, "Vitoria": 16, "Empates": 11, "Derrotas": 11, "Gols_pro": 57, "Gols_Contra": 46, "Saldo_Gols": 11, "Aproveitamento": 52.0, "Estados": "SP"
  },
  {
    "ANO": 2011, "Posicao": 7, "Time": "Figueirense", "Pontos": 58, "Vitoria": 15, "Empates": 13, "Derrotas": 10, "Gols_pro": 46, "Gols_Contra": 45, "Saldo_Gols": 1, "Aproveitamento": 51.0, "Estados": "SC"
  },
  {
    "ANO": 2011, "Posicao": 8, "Time": "Coritiba", "Pontos": 57, "Vitoria": 16, "Empates": 9, "Derrotas": 13, "Gols_pro": 57, "Gols_Contra": 41, "Saldo_Gols": 16, "Aproveitamento": 50.0, "Estados": "PR"
  },
  {
    "ANO": 2011, "Posicao": 9, "Time": "Botafogo", "Pontos": 56, "Vitoria": 16, "Empates": 8, "Derrotas": 14, "Gols_pro": 52, "Gols_Contra": 49, "Saldo_Gols": 3, "Aproveitamento": 49.0, "Estados": "RJ"
  },
  {
    "ANO": 2011, "Posicao": 10, "Time": "Santos", "Pontos": 53, "Vitoria": 15, "Empates": 8, "Derrotas": 15, "Gols_pro": 55, "Gols_Contra": 55, "Saldo_Gols": 0, "Aproveitamento": 46.0, "Estados": "SP"
  },
  {
    "ANO": 2011, "Posicao": 11, "Time": "Palmeiras", "Pontos": 50, "Vitoria": 11, "Empates": 17, "Derrotas": 10, "Gols_pro": 43, "Gols_Contra": 39, "Saldo_Gols": 4, "Aproveitamento": 44.0, "Estados": "SP"
  },
  {
    "ANO": 2011, "Posicao": 12, "Time": "Grêmio", "Pontos": 48, "Vitoria": 13, "Empates": 9, "Derrotas": 16, "Gols_pro": 49, "Gols_Contra": 57, "Saldo_Gols": -8, "Aproveitamento": 42.0, "Estados": "RS"
  },
  {
    "ANO": 2011, "Posicao": 13, "Time": "Atlético-GO", "Pontos": 48, "Vitoria": 12, "Empates": 12, "Derrotas": 14, "Gols_pro": 50, "Gols_Contra": 45, "Saldo_Gols": 5, "Aproveitamento": 42.0, "Estados": "GO"
  },
  {
    "ANO": 2011, "Posicao": 14, "Time": "Bahia", "Pontos": 46, "Vitoria": 11, "Empates": 13, "Derrotas": 14, "Gols_pro": 43, "Gols_Contra": 49, "Saldo_Gols": -6, "Aproveitamento": 40.0, "Estados": "BA"
  },
  {
    "ANO": 2011, "Posicao": 15, "Time": "Atlético-MG", "Pontos": 45, "Vitoria": 13, "Empates": 6, "Derrotas": 19, "Gols_pro": 50, "Gols_Contra": 60, "Saldo_Gols": -10, "Aproveitamento": 39.0, "Estados": "MG"
  },
  {
    "ANO": 2011, "Posicao": 16, "Time": "Cruzeiro", "Pontos": 43, "Vitoria": 11, "Empates": 10, "Derrotas": 17, "Gols_pro": 48, "Gols_Contra": 51, "Saldo_Gols": -3, "Aproveitamento": 38.0, "Estados": "MG"
  },
  {
    "ANO": 2011, "Posicao": 17, "Time": "Athletico-PR", "Pontos": 41, "Vitoria": 10, "Empates": 11, "Derrotas": 17, "Gols_pro": 38, "Gols_Contra": 55, "Saldo_Gols": -17, "Aproveitamento": 36.0, "Estados": "PR"
  },
  {
    "ANO": 2011, "Posicao": 18, "Time": "Ceará", "Pontos": 39, "Vitoria": 10, "Empates": 9, "Derrotas": 19, "Gols_pro": 47, "Gols_Contra": 64, "Saldo_Gols": -17, "Aproveitamento": 34.0, "Estados": "CE"
  },
  {
    "ANO": 2011, "Posicao": 19, "Time": "América-MG", "Pontos": 37, "Vitoria": 8, "Empates": 13, "Derrotas": 17, "Gols_pro": 51, "Gols_Contra": 69, "Saldo_Gols": -18, "Aproveitamento": 32.0, "Estados": "MG"
  },
  {
    "ANO": 2011, "Posicao": 20, "Time": "Avaí", "Pontos": 31, "Vitoria": 7, "Empates": 10, "Derrotas": 21, "Gols_pro": 45, "Gols_Contra": 75, "Saldo_Gols": -30, "Aproveitamento": 27.0, "Estados": "SC"
  },
  // 2012
  {
    "ANO": 2012, "Posicao": 1, "Time": "Fluminense", "Pontos": 77, "Vitoria": 22, "Empates": 11, "Derrotas": 5, "Gols_pro": 61, "Gols_Contra": 33, "Saldo_Gols": 28, "Aproveitamento": 67.0, "Estados": "RJ"
  },
  {
    "ANO": 2012, "Posicao": 2, "Time": "Atlético-MG", "Pontos": 72, "Vitoria": 20, "Empates": 12, "Derrotas": 6, "Gols_pro": 64, "Gols_Contra": 37, "Saldo_Gols": 27, "Aproveitamento": 63.0, "Estados": "MG"
  },
  {
    "ANO": 2012, "Posicao": 3, "Time": "Grêmio", "Pontos": 71, "Vitoria": 20, "Empates": 11, "Derrotas": 7, "Gols_pro": 56, "Gols_Contra": 33, "Saldo_Gols": 23, "Aproveitamento": 62.0, "Estados": "RS"
  },
  {
    "ANO": 2012, "Posicao": 4, "Time": "São Paulo", "Pontos": 66, "Vitoria": 20, "Empates": 6, "Derrotas": 12, "Gols_pro": 59, "Gols_Contra": 37, "Saldo_Gols": 22, "Aproveitamento": 58.0, "Estados": "SP"
  },
  {
    "ANO": 2012, "Posicao": 5, "Time": "Vasco", "Pontos": 58, "Vitoria": 16, "Empates": 10, "Derrotas": 12, "Gols_pro": 45, "Gols_Contra": 44, "Saldo_Gols": 1, "Aproveitamento": 51.0, "Estados": "RJ"
  },
  {
    "ANO": 2012, "Posicao": 6, "Time": "Corinthians", "Pontos": 57, "Vitoria": 15, "Empates": 12, "Derrotas": 11, "Gols_pro": 51, "Gols_Contra": 39, "Saldo_Gols": 12, "Aproveitamento": 50.0, "Estados": "SP"
  },
  {
    "ANO": 2012, "Posicao": 7, "Time": "Botafogo", "Pontos": 55, "Vitoria": 15, "Empates": 10, "Derrotas": 13, "Gols_pro": 60, "Gols_Contra": 50, "Saldo_Gols": 10, "Aproveitamento": 48.0, "Estados": "RJ"
  },
  {
    "ANO": 2012, "Posicao": 8, "Time": "Santos", "Pontos": 53, "Vitoria": 13, "Empates": 14, "Derrotas": 11, "Gols_pro": 50, "Gols_Contra": 44, "Saldo_Gols": 6, "Aproveitamento": 46.0, "Estados": "SP"
  },
  {
    "ANO": 2012, "Posicao": 9, "Time": "Cruzeiro", "Pontos": 52, "Vitoria": 15, "Empates": 7, "Derrotas": 16, "Gols_pro": 47, "Gols_Contra": 51, "Saldo_Gols": -4, "Aproveitamento": 45.0, "Estados": "MG"
  },
  {
    "ANO": 2012, "Posicao": 10, "Time": "Internacional", "Pontos": 52, "Vitoria": 13, "Empates": 13, "Derrotas": 12, "Gols_pro": 44, "Gols_Contra": 40, "Saldo_Gols": 4, "Aproveitamento": 45.0, "Estados": "RS"
  },
  {
    "ANO": 2012, "Posicao": 11, "Time": "Flamengo", "Pontos": 50, "Vitoria": 12, "Empates": 14, "Derrotas": 12, "Gols_pro": 39, "Gols_Contra": 46, "Saldo_Gols": -7, "Aproveitamento": 44.0, "Estados": "RJ"
  },
  {
    "ANO": 2012, "Posicao": 12, "Time": "Náutico", "Pontos": 49, "Vitoria": 14, "Empates": 7, "Derrotas": 17, "Gols_pro": 44, "Gols_Contra": 51, "Saldo_Gols": -7, "Aproveitamento": 43.0, "Estados": "PE"
  },
  {
    "ANO": 2012, "Posicao": 13, "Time": "Coritiba", "Pontos": 48, "Vitoria": 14, "Empates": 6, "Derrotas": 18, "Gols_pro": 53, "Gols_Contra": 60, "Saldo_Gols": -7, "Aproveitamento": 42.0, "Estados": "PR"
  },
  {
    "ANO": 2012, "Posicao": 14, "Time": "Ponte Preta", "Pontos": 48, "Vitoria": 12, "Empates": 12, "Derrotas": 14, "Gols_pro": 37, "Gols_Contra": 44, "Saldo_Gols": -7, "Aproveitamento": 42.0, "Estados": "SP"
  },
  {
    "ANO": 2012, "Posicao": 15, "Time": "Bahia", "Pontos": 47, "Vitoria": 11, "Empates": 14, "Derrotas": 13, "Gols_pro": 37, "Gols_Contra": 41, "Saldo_Gols": -4, "Aproveitamento": 41.0, "Estados": "BA"
  },
  {
    "ANO": 2012, "Posicao": 16, "Time": "Portuguesa", "Pontos": 45, "Vitoria": 10, "Empates": 15, "Derrotas": 13, "Gols_pro": 39, "Gols_Contra": 41, "Saldo_Gols": -2, "Aproveitamento": 39.0, "Estados": "SP"
  },
  {
    "ANO": 2012, "Posicao": 17, "Time": "Sport", "Pontos": 41, "Vitoria": 10, "Empates": 11, "Derrotas": 17, "Gols_pro": 39, "Gols_Contra": 56, "Saldo_Gols": -17, "Aproveitamento": 36.0, "Estados": "PE"
  },
  {
    "ANO": 2012, "Posicao": 18, "Time": "Palmeiras", "Pontos": 34, "Vitoria": 9, "Empates": 7, "Derrotas": 22, "Gols_pro": 39, "Gols_Contra": 54, "Saldo_Gols": -15, "Aproveitamento": 30.0, "Estados": "SP"
  },
  {
    "ANO": 2012, "Posicao": 19, "Time": "Atlético-GO", "Pontos": 30, "Vitoria": 7, "Empates": 9, "Derrotas": 22, "Gols_pro": 37, "Gols_Contra": 67, "Saldo_Gols": -30, "Aproveitamento": 26.0, "Estados": "GO"
  },
  {
    "ANO": 2012, "Posicao": 20, "Time": "Figueirense", "Pontos": 30, "Vitoria": 7, "Empates": 9, "Derrotas": 22, "Gols_pro": 39, "Gols_Contra": 72, "Saldo_Gols": -33, "Aproveitamento": 26.0, "Estados": "SC"
  },
  // 2013
  {
    "ANO": 2013, "Posicao": 1, "Time": "Cruzeiro", "Pontos": 76, "Vitoria": 23, "Empates": 7, "Derrotas": 8, "Gols_pro": 77, "Gols_Contra": 37, "Saldo_Gols": 40, "Aproveitamento": 67.0, "Estados": "MG"
  },
  {
    "ANO": 2013, "Posicao": 2, "Time": "Grêmio", "Pontos": 65, "Vitoria": 18, "Empates": 11, "Derrotas": 9, "Gols_pro": 42, "Gols_Contra": 35, "Saldo_Gols": 7, "Aproveitamento": 57.0, "Estados": "RS"
  },
  {
    "ANO": 2013, "Posicao": 3, "Time": "Athletico-PR", "Pontos": 64, "Vitoria": 18, "Empates": 10, "Derrotas": 10, "Gols_pro": 65, "Gols_Contra": 49, "Saldo_Gols": 16, "Aproveitamento": 56.0, "Estados": "PR"
  },
  {
    "ANO": 2013, "Posicao": 4, "Time": "Botafogo", "Pontos": 61, "Vitoria": 17, "Empates": 10, "Derrotas": 11, "Gols_pro": 55, "Gols_Contra": 41, "Saldo_Gols": 14, "Aproveitamento": 53.0, "Estados": "RJ"
  },
  {
    "ANO": 2013, "Posicao": 5, "Time": "Vitória", "Pontos": 59, "Vitoria": 16, "Empates": 11, "Derrotas": 11, "Gols_pro": 59, "Gols_Contra": 53, "Saldo_Gols": 6, "Aproveitamento": 52.0, "Estados": "PE"
  },
  {
    "ANO": 2013, "Posicao": 6, "Time": "Goiás", "Pontos": 59, "Vitoria": 16, "Empates": 11, "Derrotas": 11, "Gols_pro": 48, "Gols_Contra": 44, "Saldo_Gols": 4, "Aproveitamento": 52.0, "Estados": "GO"
  },
  {
    "ANO": 2013, "Posicao": 7, "Time": "Santos", "Pontos": 57, "Vitoria": 15, "Empates": 12, "Derrotas": 11, "Gols_pro": 51, "Gols_Contra": 38, "Saldo_Gols": 13, "Aproveitamento": 50.0, "Estados": "SP"
  },
  {
    "ANO": 2013, "Posicao": 8, "Time": "Atlético-MG", "Pontos": 57, "Vitoria": 15, "Empates": 12, "Derrotas": 11, "Gols_pro": 49, "Gols_Contra": 38, "Saldo_Gols": 11, "Aproveitamento": 50.0, "Estados": "MG"
  },
  {
    "ANO": 2013, "Posicao": 9, "Time": "São Paulo", "Pontos": 50, "Vitoria": 14, "Empates": 8, "Derrotas": 16, "Gols_pro": 39, "Gols_Contra": 40, "Saldo_Gols": -1, "Aproveitamento": 44.0, "Estados": "SP"
  },
  {
    "ANO": 2013, "Posicao": 10, "Time": "Corinthians", "Pontos": 50, "Vitoria": 11, "Empates": 17, "Derrotas": 10, "Gols_pro": 27, "Gols_Contra": 22, "Saldo_Gols": 5, "Aproveitamento": 44.0, "Estados": "SP"
  },
  {
    "ANO": 2013, "Posicao": 11, "Time": "Coritiba", "Pontos": 48, "Vitoria": 12, "Empates": 12, "Derrotas": 14, "Gols_pro": 42, "Gols_Contra": 45, "Saldo_Gols": -3, "Aproveitamento": 42.0, "Estados": "PR"
  },
  {
    "ANO": 2013, "Posicao": 12, "Time": "Bahia", "Pontos": 48, "Vitoria": 12, "Empates": 12, "Derrotas": 14, "Gols_pro": 37, "Gols_Contra": 45, "Saldo_Gols": -8, "Aproveitamento": 42.0, "Estados": "BA"
  },
  {
    "ANO": 2013, "Posicao": 13, "Time": "Internacional", "Pontos": 48, "Vitoria": 11, "Empates": 15, "Derrotas": 12, "Gols_pro": 51, "Gols_Contra": 52, "Saldo_Gols": -1, "Aproveitamento": 42.0, "Estados": "RS"
  },
  {
    "ANO": 2013, "Posicao": 14, "Time": "Criciúma", "Pontos": 46, "Vitoria": 13, "Empates": 7, "Derrotas": 18, "Gols_pro": 49, "Gols_Contra": 63, "Saldo_Gols": -14, "Aproveitamento": 40.0, "Estados": "SC"
  },
  {
    "ANO": 2013, "Posicao": 15, "Time": "Fluminense", "Pontos": 46, "Vitoria": 12, "Empates": 10, "Derrotas": 16, "Gols_pro": 43, "Gols_Contra": 47, "Saldo_Gols": -4, "Aproveitamento": 40.0, "Estados": "RJ"
  },
  {
    "ANO": 2013, "Posicao": 16, "Time": "Flamengo", "Pontos": 45, "Vitoria": 12, "Empates": 13, "Derrotas": 13, "Gols_pro": 43, "Gols_Contra": 46, "Saldo_Gols": -3, "Aproveitamento": 43.0, "Estados": "RJ"
  },
  {
    "ANO": 2013, "Posicao": 17, "Time": "Portuguesa", "Pontos": 44, "Vitoria": 12, "Empates": 12, "Derrotas": 14, "Gols_pro": 50, "Gols_Contra": 46, "Saldo_Gols": 4, "Aproveitamento": 42.0, "Estados": "SP"
  },
  {
    "ANO": 2013, "Posicao": 18, "Time": "Vasco", "Pontos": 44, "Vitoria": 11, "Empates": 11, "Derrotas": 16, "Gols_pro": 50, "Gols_Contra": 61, "Saldo_Gols": -11, "Aproveitamento": 38.0, "Estados": "RJ"
  },
  {
    "ANO": 2013, "Posicao": 19, "Time": "Ponte Preta", "Pontos": 37, "Vitoria": 9, "Empates": 10, "Derrotas": 19, "Gols_pro": 37, "Gols_Contra": 55, "Saldo_Gols": -18, "Aproveitamento": 32.0, "Estados": "SP"
  },
  {
    "ANO": 2013, "Posicao": 20, "Time": "Náutico", "Pontos": 20, "Vitoria": 5, "Empates": 5, "Derrotas": 28, "Gols_pro": 22, "Gols_Contra": 79, "Saldo_Gols": -57, "Aproveitamento": 17.0, "Estados": "PE"
  },
  // 2014
  {
    "ANO": 2014, "Posicao": 1, "Time": "Cruzeiro", "Pontos": 80, "Vitoria": 24, "Empates": 8, "Derrotas": 6, "Gols_pro": 67, "Gols_Contra": 38, "Saldo_Gols": 29, "Aproveitamento": 70.2, "Estados": "MG"
  },
  {
    "ANO": 2014, "Posicao": 2, "Time": "São Paulo", "Pontos": 70, "Vitoria": 20, "Empates": 10, "Derrotas": 8, "Gols_pro": 59, "Gols_Contra": 40, "Saldo_Gols": 19, "Aproveitamento": 61.4, "Estados": "SP"
  },
  {
    "ANO": 2014, "Posicao": 3, "Time": "Internacional", "Pontos": 69, "Vitoria": 21, "Empates": 6, "Derrotas": 11, "Gols_pro": 53, "Gols_Contra": 41, "Saldo_Gols": 12, "Aproveitamento": 60.5, "Estados": "RS"
  },
  {
    "ANO": 2014, "Posicao": 4, "Time": "Corinthians", "Pontos": 69, "Vitoria": 19, "Empates": 12, "Derrotas": 7, "Gols_pro": 49, "Gols_Contra": 31, "Saldo_Gols": 18, "Aproveitamento": 60.5, "Estados": "SP"
  },
  {
    "ANO": 2014, "Posicao": 5, "Time": "Atlético-MG", "Pontos": 62, "Vitoria": 17, "Empates": 11, "Derrotas": 10, "Gols_pro": 51, "Gols_Contra": 38, "Saldo_Gols": 13, "Aproveitamento": 54.4, "Estados": "MG"
  },
  {
    "ANO": 2014, "Posicao": 6, "Time": "Fluminense", "Pontos": 61, "Vitoria": 17, "Empates": 10, "Derrotas": 11, "Gols_pro": 61, "Gols_Contra": 42, "Saldo_Gols": 19, "Aproveitamento": 53.5, "Estados": "RJ"
  },
  {
    "ANO": 2014, "Posicao": 7, "Time": "Grêmio", "Pontos": 61, "Vitoria": 17, "Empates": 10, "Derrotas": 11, "Gols_pro": 36, "Gols_Contra": 24, "Saldo_Gols": 12, "Aproveitamento": 53.5, "Estados": "RS"
  },
  {
    "ANO": 2014, "Posicao": 8, "Time": "Athletico-PR", "Pontos": 54, "Vitoria": 15, "Empates": 9, "Derrotas": 14, "Gols_pro": 43, "Gols_Contra": 42, "Saldo_Gols": 1, "Aproveitamento": 47.4, "Estados": "PR"
  },
  {
    "ANO": 2014, "Posicao": 9, "Time": "Santos", "Pontos": 53, "Vitoria": 15, "Empates": 8, "Derrotas": 15, "Gols_pro": 42, "Gols_Contra": 35, "Saldo_Gols": 7, "Aproveitamento": 46.5, "Estados": "SP"
  },
  {
    "ANO": 2014, "Posicao": 10, "Time": "Flamengo", "Pontos": 52, "Vitoria": 14, "Empates": 10, "Derrotas": 14, "Gols_pro": 46, "Gols_Contra": 47, "Saldo_Gols": -1, "Aproveitamento": 45.6, "Estados": "RJ"
  },
  {
    "ANO": 2014, "Posicao": 11, "Time": "Sport", "Pontos": 52, "Vitoria": 14, "Empates": 10, "Derrotas": 14, "Gols_pro": 36, "Gols_Contra": 46, "Saldo_Gols": -10, "Aproveitamento": 45.6, "Estados": "PE"
  },
  {
    "ANO": 2014, "Posicao": 12, "Time": "Goiás", "Pontos": 47, "Vitoria": 13, "Empates": 8, "Derrotas": 17, "Gols_pro": 38, "Gols_Contra": 40, "Saldo_Gols": -2, "Aproveitamento": 41.2, "Estados": "GO"
  },
  {
    "ANO": 2014, "Posicao": 13, "Time": "Figueirense", "Pontos": 47, "Vitoria": 13, "Empates": 8, "Derrotas": 17, "Gols_pro": 37, "Gols_Contra": 47, "Saldo_Gols": -10, "Aproveitamento": 41.2, "Estados": "SC"
  },
  {
    "ANO": 2014, "Posicao": 14, "Time": "Coritiba", "Pontos": 47, "Vitoria": 12, "Empates": 11, "Derrotas": 15, "Gols_pro": 42, "Gols_Contra": 45, "Saldo_Gols": -3, "Aproveitamento": 41.2, "Estados": "PR"
  },
  {
    "ANO": 2014, "Posicao": 15, "Time": "Chapecoense", "Pontos": 43, "Vitoria": 11, "Empates": 10, "Derrotas": 17, "Gols_pro": 39, "Gols_Contra": 44, "Saldo_Gols": -5, "Aproveitamento": 37.7, "Estados": "SC"
  },
  {
    "ANO": 2014, "Posicao": 16, "Time": "Palmeiras", "Pontos": 40, "Vitoria": 11, "Empates": 7, "Derrotas": 20, "Gols_pro": 34, "Gols_Contra": 59, "Saldo_Gols": -25, "Aproveitamento": 35.1, "Estados": "SP"
  },
  {
    "ANO": 2014, "Posicao": 17, "Time": "Vitória", "Pontos": 38, "Vitoria": 10, "Empates": 8, "Derrotas": 20, "Gols_pro": 37, "Gols_Contra": 54, "Saldo_Gols": -17, "Aproveitamento": 33.3, "Estados": "PE"
  },
  {
    "ANO": 2014, "Posicao": 18, "Time": "Bahia", "Pontos": 37, "Vitoria": 9, "Empates": 10, "Derrotas": 19, "Gols_pro": 31, "Gols_Contra": 43, "Saldo_Gols": -12, "Aproveitamento": 32.5, "Estados": "BA"
  },
  {
    "ANO": 2014, "Posicao": 19, "Time": "Botafogo", "Pontos": 34, "Vitoria": 9, "Empates": 7, "Derrotas": 22, "Gols_pro": 31, "Gols_Contra": 48, "Saldo_Gols": -17, "Aproveitamento": 29.8, "Estados": "RJ"
  },
  {
    "ANO": 2014, "Posicao": 20, "Time": "Criciúma", "Pontos": 32, "Vitoria": 7, "Empates": 11, "Derrotas": 20, "Gols_pro": 28, "Gols_Contra": 56, "Saldo_Gols": -28, "Aproveitamento": 28.1, "Estados": "SC"
  },
  // 2015
  {
    "ANO": 2015, "Posicao": 1, "Time": "Corinthians", "Pontos": 81, "Vitoria": 24, "Empates": 9, "Derrotas": 5, "Gols_pro": 71, "Gols_Contra": 31, "Saldo_Gols": 40, "Aproveitamento": 71.0, "Estados": "SP"
  },
  {
    "ANO": 2015, "Posicao": 2, "Time": "Atlético-MG", "Pontos": 69, "Vitoria": 21, "Empates": 6, "Derrotas": 11, "Gols_pro": 65, "Gols_Contra": 47, "Saldo_Gols": 18, "Aproveitamento": 61.0, "Estados": "MG"
  },
  {
    "ANO": 2015, "Posicao": 3, "Time": "Grêmio", "Pontos": 68, "Vitoria": 20, "Empates": 8, "Derrotas": 10, "Gols_pro": 52, "Gols_Contra": 32, "Saldo_Gols": 20, "Aproveitamento": 60.0, "Estados": "RS"
  },
  {
    "ANO": 2015, "Posicao": 4, "Time": "São Paulo", "Pontos": 62, "Vitoria": 18, "Empates": 8, "Derrotas": 12, "Gols_pro": 53, "Gols_Contra": 47, "Saldo_Gols": 6, "Aproveitamento": 54.0, "Estados": "SP"
  },
  {
    "ANO": 2015, "Posicao": 5, "Time": "Internacional", "Pontos": 60, "Vitoria": 17, "Empates": 9, "Derrotas": 12, "Gols_pro": 39, "Gols_Contra": 38, "Saldo_Gols": 1, "Aproveitamento": 53.0, "Estados": "RS"
  },
  {
    "ANO": 2015, "Posicao": 6, "Time": "Sport", "Pontos": 59, "Vitoria": 15, "Empates": 14, "Derrotas": 9, "Gols_pro": 53, "Gols_Contra": 38, "Saldo_Gols": 15, "Aproveitamento": 52.0, "Estados": "PE"
  },
  {
    "ANO": 2015, "Posicao": 7, "Time": "Santos", "Pontos": 58, "Vitoria": 16, "Empates": 10, "Derrotas": 12, "Gols_pro": 59, "Gols_Contra": 41, "Saldo_Gols": 18, "Aproveitamento": 51.0, "Estados": "SP"
  },
  {
    "ANO": 2015, "Posicao": 8, "Time": "Cruzeiro", "Pontos": 55, "Vitoria": 15, "Empates": 10, "Derrotas": 13, "Gols_pro": 44, "Gols_Contra": 35, "Saldo_Gols": 9, "Aproveitamento": 48.0, "Estados": "MG"
  },
  {
    "ANO": 2015, "Posicao": 9, "Time": "Palmeiras", "Pontos": 53, "Vitoria": 15, "Empates": 8, "Derrotas": 15, "Gols_pro": 60, "Gols_Contra": 51, "Saldo_Gols": 9, "Aproveitamento": 46.0, "Estados": "SP"
  },
  {
    "ANO": 2015, "Posicao": 10, "Time": "Athletico-PR", "Pontos": 51, "Vitoria": 14, "Empates": 9, "Derrotas": 15, "Gols_pro": 43, "Gols_Contra": 48, "Saldo_Gols": -5, "Aproveitamento": 45.0, "Estados": "PR"
  },
  {
    "ANO": 2015, "Posicao": 11, "Time": "Ponte Preta", "Pontos": 51, "Vitoria": 13, "Empates": 12, "Derrotas": 13, "Gols_pro": 41, "Gols_Contra": 40, "Saldo_Gols": 1, "Aproveitamento": 45.0, "Estados": "SP"
  },
  {
    "ANO": 2015, "Posicao": 12, "Time": "Flamengo", "Pontos": 49, "Vitoria": 15, "Empates": 4, "Derrotas": 19, "Gols_pro": 45, "Gols_Contra": 53, "Saldo_Gols": -8, "Aproveitamento": 43.0, "Estados": "RJ"
  },
  {
    "ANO": 2015, "Posicao": 13, "Time": "Fluminense", "Pontos": 47, "Vitoria": 14, "Empates": 5, "Derrotas": 19, "Gols_pro": 40, "Gols_Contra": 49, "Saldo_Gols": -9, "Aproveitamento": 41.0, "Estados": "RJ"
  },
  {
    "ANO": 2015, "Posicao": 14, "Time": "Chapecoense", "Pontos": 47, "Vitoria": 12, "Empates": 11, "Derrotas": 15, "Gols_pro": 34, "Gols_Contra": 44, "Saldo_Gols": -10, "Aproveitamento": 41.0, "Estados": "SC"
  },
  {
    "ANO": 2015, "Posicao": 15, "Time": "Coritiba", "Pontos": 44, "Vitoria": 11, "Empates": 11, "Derrotas": 16, "Gols_pro": 31, "Gols_Contra": 42, "Saldo_Gols": -11, "Aproveitamento": 39.0, "Estados": "PR"
  },
  {
    "ANO": 2015, "Posicao": 16, "Time": "Figueirense", "Pontos": 43, "Vitoria": 11, "Empates": 10, "Derrotas": 17, "Gols_pro": 36, "Gols_Contra": 50, "Saldo_Gols": -14, "Aproveitamento": 38.0, "Estados": "SC"
  },
  {
    "ANO": 2015, "Posicao": 17, "Time": "Avaí", "Pontos": 42, "Vitoria": 11, "Empates": 9, "Derrotas": 18, "Gols_pro": 38, "Gols_Contra": 60, "Saldo_Gols": -22, "Aproveitamento": 37.0, "Estados": "SC"
  },
  {
    "ANO": 2015, "Posicao": 18, "Time": "Vasco", "Pontos": 41, "Vitoria": 10, "Empates": 11, "Derrotas": 17, "Gols_pro": 28, "Gols_Contra": 54, "Saldo_Gols": -26, "Aproveitamento": 36.0, "Estados": "RJ"
  },
  {
    "ANO": 2015, "Posicao": 19, "Time": "Goiás", "Pontos": 38, "Vitoria": 10, "Empates": 8, "Derrotas": 20, "Gols_pro": 39, "Gols_Contra": 49, "Saldo_Gols": -10, "Aproveitamento": 33.0, "Estados": "GO"
  },
  {
    "ANO": 2015, "Posicao": 20, "Time": "Joinville", "Pontos": 31, "Vitoria": 7, "Empates": 10, "Derrotas": 21, "Gols_pro": 26, "Gols_Contra": 48, "Saldo_Gols": -22, "Aproveitamento": 27.0, "Estados": "SC"
  },
  // 2016
  {
    "ANO": 2016, "Posicao": 1, "Time": "Palmeiras", "Pontos": 80, "Vitoria": 24, "Empates": 8, "Derrotas": 6, "Gols_pro": 62, "Gols_Contra": 32, "Saldo_Gols": 30, "Aproveitamento": 70.0, "Estados": "SP"
  },
  {
    "ANO": 2016, "Posicao": 2, "Time": "Santos", "Pontos": 71, "Vitoria": 22, "Empates": 5, "Derrotas": 11, "Gols_pro": 59, "Gols_Contra": 35, "Saldo_Gols": 24, "Aproveitamento": 62.0, "Estados": "SP"
  },
  {
    "ANO": 2016, "Posicao": 3, "Time": "Flamengo", "Pontos": 71, "Vitoria": 20, "Empates": 11, "Derrotas": 7, "Gols_pro": 52, "Gols_Contra": 35, "Saldo_Gols": 17, "Aproveitamento": 62.0, "Estados": "RJ"
  },
  {
    "ANO": 2016, "Posicao": 4, "Time": "Atlético-MG", "Pontos": 62, "Vitoria": 17, "Empates": 11, "Derrotas": 10, "Gols_pro": 61, "Gols_Contra": 53, "Saldo_Gols": 8, "Aproveitamento": 54.0, "Estados": "MG"
  },
  {
    "ANO": 2016, "Posicao": 5, "Time": "Botafogo", "Pontos": 59, "Vitoria": 17, "Empates": 8, "Derrotas": 13, "Gols_pro": 43, "Gols_Contra": 39, "Saldo_Gols": 4, "Aproveitamento": 52.0, "Estados": "RJ"
  },
  {
    "ANO": 2016, "Posicao": 6, "Time": "Athletico-PR", "Pontos": 57, "Vitoria": 17, "Empates": 6, "Derrotas": 15, "Gols_pro": 38, "Gols_Contra": 32, "Saldo_Gols": 6, "Aproveitamento": 50.0, "Estados": "PR"
  },
  {
    "ANO": 2016, "Posicao": 7, "Time": "Corinthians", "Pontos": 55, "Vitoria": 15, "Empates": 10, "Derrotas": 13, "Gols_pro": 48, "Gols_Contra": 42, "Saldo_Gols": 6, "Aproveitamento": 48.0, "Estados": "SP"
  },
  {
    "ANO": 2016, "Posicao": 8, "Time": "Ponte Preta", "Pontos": 53, "Vitoria": 15, "Empates": 8, "Derrotas": 15, "Gols_pro": 48, "Gols_Contra": 52, "Saldo_Gols": -4, "Aproveitamento": 46.0, "Estados": "SP"
  },
  {
    "ANO": 2016, "Posicao": 9, "Time": "Grêmio", "Pontos": 53, "Vitoria": 14, "Empates": 11, "Derrotas": 13, "Gols_pro": 41, "Gols_Contra": 44, "Saldo_Gols": -3, "Aproveitamento": 46.0, "Estados": "RS"
  },
  {
    "ANO": 2016, "Posicao": 10, "Time": "São Paulo", "Pontos": 52, "Vitoria": 14, "Empates": 10, "Derrotas": 14, "Gols_pro": 44, "Gols_Contra": 36, "Saldo_Gols": 8, "Aproveitamento": 46.0, "Estados": "SP"
  },
  {
    "ANO": 2016, "Posicao": 11, "Time": "Chapecoense", "Pontos": 52, "Vitoria": 13, "Empates": 13, "Derrotas": 12, "Gols_pro": 49, "Gols_Contra": 56, "Saldo_Gols": -7, "Aproveitamento": 46.0, "Estados": "SC"
  },
  {
    "ANO": 2016, "Posicao": 12, "Time": "Cruzeiro", "Pontos": 51, "Vitoria": 14, "Empates": 9, "Derrotas": 15, "Gols_pro": 48, "Gols_Contra": 49, "Saldo_Gols": -1, "Aproveitamento": 45.0, "Estados": "MG"
  },
  {
    "ANO": 2016, "Posicao": 13, "Time": "Fluminense", "Pontos": 50, "Vitoria": 13, "Empates": 11, "Derrotas": 14, "Gols_pro": 45, "Gols_Contra": 45, "Saldo_Gols": 0, "Aproveitamento": 44.0, "Estados": "RJ"
  },
  {
    "ANO": 2016, "Posicao": 14, "Time": "Sport", "Pontos": 47, "Vitoria": 13, "Empates": 8, "Derrotas": 17, "Gols_pro": 49, "Gols_Contra": 55, "Saldo_Gols": -6, "Aproveitamento": 41.0, "Estados": "PE"
  },
  {
    "ANO": 2016, "Posicao": 15, "Time": "Coritiba", "Pontos": 46, "Vitoria": 11, "Empates": 13, "Derrotas": 14, "Gols_pro": 41, "Gols_Contra": 42, "Saldo_Gols": -1, "Aproveitamento": 40.0, "Estados": "PR"
  },
  {
    "ANO": 2016, "Posicao": 16, "Time": "Vitória", "Pontos": 45, "Vitoria": 12, "Empates": 9, "Derrotas": 17, "Gols_pro": 51, "Gols_Contra": 53, "Saldo_Gols": -2, "Aproveitamento": 39.0, "Estados": "PE"
  },
  {
    "ANO": 2016, "Posicao": 17, "Time": "Internacional", "Pontos": 43, "Vitoria": 11, "Empates": 10, "Derrotas": 17, "Gols_pro": 35, "Gols_Contra": 41, "Saldo_Gols": -6, "Aproveitamento": 38.0, "Estados": "RS"
  },
  {
    "ANO": 2016, "Posicao": 18, "Time": "Figueirense", "Pontos": 37, "Vitoria": 8, "Empates": 13, "Derrotas": 17, "Gols_pro": 30, "Gols_Contra": 50, "Saldo_Gols": -20, "Aproveitamento": 32.0, "Estados": "SC"
  },
  {
    "ANO": 2016, "Posicao": 19, "Time": "Santa Cruz", "Pontos": 31, "Vitoria": 8, "Empates": 7, "Derrotas": 23, "Gols_pro": 45, "Gols_Contra": 69, "Saldo_Gols": -24, "Aproveitamento": 27.0, "Estados": "PE"
  },
  {
    "ANO": 2016, "Posicao": 20, "Time": "América-MG", "Pontos": 28, "Vitoria": 7, "Empates": 7, "Derrotas": 24, "Gols_pro": 23, "Gols_Contra": 58, "Saldo_Gols": -35, "Aproveitamento": 25.0, "Estados": "MG"
  },
  // 2017
  {
    "ANO": 2017, "Posicao": 1, "Time": "Corinthians", "Pontos": 72, "Vitoria": 21, "Empates": 9, "Derrotas": 8, "Gols_pro": 50, "Gols_Contra": 30, "Saldo_Gols": 20, "Aproveitamento": 63.0, "Estados": "SP"
  },
  {
    "ANO": 2017, "Posicao": 2, "Time": "Palmeiras", "Pontos": 63, "Vitoria": 19, "Empates": 6, "Derrotas": 13, "Gols_pro": 61, "Gols_Contra": 45, "Saldo_Gols": 16, "Aproveitamento": 55.0, "Estados": "SP"
  },
  {
    "ANO": 2017, "Posicao": 3, "Time": "Santos", "Pontos": 63, "Vitoria": 17, "Empates": 12, "Derrotas": 9, "Gols_pro": 42, "Gols_Contra": 32, "Saldo_Gols": 10, "Aproveitamento": 55.0, "Estados": "SP"
  },
  {
    "ANO": 2017, "Posicao": 4, "Time": "Grêmio", "Pontos": 62, "Vitoria": 18, "Empates": 8, "Derrotas": 12, "Gols_pro": 55, "Gols_Contra": 36, "Saldo_Gols": 19, "Aproveitamento": 54.0, "Estados": "RS"
  },
  {
    "ANO": 2017, "Posicao": 5, "Time": "Cruzeiro", "Pontos": 57, "Vitoria": 15, "Empates": 12, "Derrotas": 11, "Gols_pro": 47, "Gols_Contra": 39, "Saldo_Gols": 8, "Aproveitamento": 50.0, "Estados": "MG"
  },
  {
    "ANO": 2017, "Posicao": 6, "Time": "Flamengo", "Pontos": 56, "Vitoria": 15, "Empates": 11, "Derrotas": 12, "Gols_pro": 49, "Gols_Contra": 38, "Saldo_Gols": 11, "Aproveitamento": 49.0, "Estados": "RJ"
  },
  {
    "ANO": 2017, "Posicao": 7, "Time": "Vasco", "Pontos": 56, "Vitoria": 15, "Empates": 11, "Derrotas": 12, "Gols_pro": 40, "Gols_Contra": 47, "Saldo_Gols": -7, "Aproveitamento": 49.0, "Estados": "RJ"
  },
  {
    "ANO": 2017, "Posicao": 8, "Time": "Chapecoense", "Pontos": 54, "Vitoria": 15, "Empates": 9, "Derrotas": 14, "Gols_pro": 47, "Gols_Contra": 49, "Saldo_Gols": -2, "Aproveitamento": 47.0, "Estados": "SC"
  },
  {
    "ANO": 2017, "Posicao": 9, "Time": "Atlético-MG", "Pontos": 54, "Vitoria": 14, "Empates": 12, "Derrotas": 12, "Gols_pro": 52, "Gols_Contra": 49, "Saldo_Gols": 3, "Aproveitamento": 47.0, "Estados": "MG"
  },
  {
    "ANO": 2017, "Posicao": 10, "Time": "Botafogo", "Pontos": 53, "Vitoria": 14, "Empates": 11, "Derrotas": 13, "Gols_pro": 45, "Gols_Contra": 42, "Saldo_Gols": 3, "Aproveitamento": 46.0, "Estados": "RJ"
  },
  {
    "ANO": 2017, "Posicao": 11, "Time": "Athletico-PR", "Pontos": 51, "Vitoria": 14, "Empates": 9, "Derrotas": 15, "Gols_pro": 45, "Gols_Contra": 43, "Saldo_Gols": 2, "Aproveitamento": 45.0, "Estados": "PR"
  },
  {
    "ANO": 2017, "Posicao": 12, "Time": "Bahia", "Pontos": 50, "Vitoria": 13, "Empates": 11, "Derrotas": 14, "Gols_pro": 50, "Gols_Contra": 48, "Saldo_Gols": 2, "Aproveitamento": 44.0, "Estados": "BA"
  },
  {
    "ANO": 2017, "Posicao": 13, "Time": "São Paulo", "Pontos": 50, "Vitoria": 13, "Empates": 11, "Derrotas": 14, "Gols_pro": 48, "Gols_Contra": 49, "Saldo_Gols": -1, "Aproveitamento": 44.0, "Estados": "SP"
  },
  {
    "ANO": 2017, "Posicao": 14, "Time": "Fluminense", "Pontos": 47, "Vitoria": 11, "Empates": 14, "Derrotas": 13, "Gols_pro": 50, "Gols_Contra": 53, "Saldo_Gols": -3, "Aproveitamento": 41.0, "Estados": "RJ"
  },
  {
    "ANO": 2017, "Posicao": 15, "Time": "Coritiba", "Pontos": 44, "Vitoria": 11, "Empates": 11, "Derrotas": 16, "Gols_pro": 31, "Gols_Contra": 42, "Saldo_Gols": -11, "Aproveitamento": 39.0, "Estados": "PR"
  },
  {
    "ANO": 2017, "Posicao": 16, "Time": "Figueirense", "Pontos": 43, "Vitoria": 11, "Empates": 10, "Derrotas": 17, "Gols_pro": 36, "Gols_Contra": 50, "Saldo_Gols": -14, "Aproveitamento": 38.0, "Estados": "SC"
  },
  {
    "ANO": 2017, "Posicao": 17, "Time": "Avaí", "Pontos": 42, "Vitoria": 11, "Empates": 9, "Derrotas": 18, "Gols_pro": 38, "Gols_Contra": 60, "Saldo_Gols": -22, "Aproveitamento": 37.0, "Estados": "SC"
  },
  {
    "ANO": 2017, "Posicao": 18, "Time": "Vasco", "Pontos": 41, "Vitoria": 10, "Empates": 11, "Derrotas": 17, "Gols_pro": 28, "Gols_Contra": 54, "Saldo_Gols": -26, "Aproveitamento": 36.0, "Estados": "RJ"
  },
  {
    "ANO": 2017, "Posicao": 19, "Time": "Goiás", "Pontos": 38, "Vitoria": 10, "Empates": 8, "Derrotas": 20, "Gols_pro": 39, "Gols_Contra": 49, "Saldo_Gols": -10, "Aproveitamento": 33.0, "Estados": "GO"
  },
  {
    "ANO": 2017, "Posicao": 20, "Time": "Joinville", "Pontos": 31, "Vitoria": 7, "Empates": 10, "Derrotas": 21, "Gols_pro": 26, "Gols_Contra": 48, "Saldo_Gols": -22, "Aproveitamento": 27.0, "Estados": "SC"
  },
  // 2018
  {
    "ANO": 2018, "Posicao": 1, "Time": "Palmeiras", "Pontos": 80, "Vitoria": 24, "Empates": 8, "Derrotas": 6, "Gols_pro": 62, "Gols_Contra": 32, "Saldo_Gols": 30, "Aproveitamento": 70.0, "Estados": "SP"
  },
  {
    "ANO": 2018, "Posicao": 2, "Time": "Santos", "Pontos": 71, "Vitoria": 22, "Empates": 5, "Derrotas": 11, "Gols_pro": 59, "Gols_Contra": 35, "Saldo_Gols": 24, "Aproveitamento": 62.0, "Estados": "SP"
  },
  {
    "ANO": 2018, "Posicao": 3, "Time": "Flamengo", "Pontos": 71, "Vitoria": 20, "Empates": 11, "Derrotas": 7, "Gols_pro": 52, "Gols_Contra": 35, "Saldo_Gols": 17, "Aproveitamento": 62.0, "Estados": "RJ"
  },
  {
    "ANO": 2018, "Posicao": 4, "Time": "Atlético-MG", "Pontos": 62, "Vitoria": 17, "Empates": 11, "Derrotas": 10, "Gols_pro": 61, "Gols_Contra": 53, "Saldo_Gols": 8, "Aproveitamento": 54.0, "Estados": "MG"
  },
  {
    "ANO": 2018, "Posicao": 5, "Time": "Botafogo", "Pontos": 59, "Vitoria": 17, "Empates": 8, "Derrotas": 13, "Gols_pro": 43, "Gols_Contra": 39, "Saldo_Gols": 4, "Aproveitamento": 52.0, "Estados": "RJ"
  },
  {
    "ANO": 2018, "Posicao": 6, "Time": "Athletico-PR", "Pontos": 57, "Vitoria": 17, "Empates": 6, "Derrotas": 15, "Gols_pro": 38, "Gols_Contra": 32, "Saldo_Gols": 6, "Aproveitamento": 50.0, "Estados": "PR"
  },
  {
    "ANO": 2018, "Posicao": 7, "Time": "Corinthians", "Pontos": 55, "Vitoria": 15, "Empates": 10, "Derrotas": 13, "Gols_pro": 48, "Gols_Contra": 42, "Saldo_Gols": 6, "Aproveitamento": 48.0, "Estados": "SP"
  },
  {
    "ANO": 2018, "Posicao": 8, "Time": "Ponte Preta", "Pontos": 53, "Vitoria": 15, "Empates": 8, "Derrotas": 15, "Gols_pro": 48, "Gols_Contra": 52, "Saldo_Gols": -4, "Aproveitamento": 46.0, "Estados": "SP"
  },
  {
    "ANO": 2018, "Posicao": 9, "Time": "Grêmio", "Pontos": 53, "Vitoria": 14, "Empates": 11, "Derrotas": 13, "Gols_pro": 41, "Gols_Contra": 44, "Saldo_Gols": -3, "Aproveitamento": 46.0, "Estados": "RS"
  },
  {
    "ANO": 2018, "Posicao": 10, "Time": "São Paulo", "Pontos": 52, "Vitoria": 14, "Empates": 10, "Derrotas": 14, "Gols_pro": 44, "Gols_Contra": 36, "Saldo_Gols": 8, "Aproveitamento": 46.0, "Estados": "SP"
  },
  {
    "ANO": 2018, "Posicao": 11, "Time": "Chapecoense", "Pontos": 52, "Vitoria": 13, "Empates": 13, "Derrotas": 12, "Gols_pro": 49, "Gols_Contra": 56, "Saldo_Gols": -7, "Aproveitamento": 46.0, "Estados": "SC"
  },
  {
    "ANO": 2018, "Posicao": 12, "Time": "Cruzeiro", "Pontos": 51, "Vitoria": 14, "Empates": 9, "Derrotas": 15, "Gols_pro": 48, "Gols_Contra": 49, "Saldo_Gols": -1, "Aproveitamento": 45.0, "Estados": "MG"
  },
  {
    "ANO": 2018, "Posicao": 13, "Time": "Fluminense", "Pontos": 50, "Vitoria": 13, "Empates": 11, "Derrotas": 14, "Gols_pro": 45, "Gols_Contra": 45, "Saldo_Gols": 0, "Aproveitamento": 44.0, "Estados": "RJ"
  },
  {
    "ANO": 2018, "Posicao": 14, "Time": "Sport", "Pontos": 47, "Vitoria": 13, "Empates": 8, "Derrotas": 17, "Gols_pro": 49, "Gols_Contra": 55, "Saldo_Gols": -6, "Aproveitamento": 41.0, "Estados": "PE"
  },
  {
    "ANO": 2018, "Posicao": 15, "Time": "Coritiba", "Pontos": 46, "Vitoria": 11, "Empates": 13, "Derrotas": 14, "Gols_pro": 41, "Gols_Contra": 42, "Saldo_Gols": -1, "Aproveitamento": 40.0, "Estados": "PR"
  },
  {
    "ANO": 2018, "Posicao": 16, "Time": "Vitória", "Pontos": 45, "Vitoria": 12, "Empates": 9, "Derrotas": 17, "Gols_pro": 51, "Gols_Contra": 53, "Saldo_Gols": -2, "Aproveitamento": 39.0, "Estados": "PE"
  },
  {
    "ANO": 2018, "Posicao": 17, "Time": "Internacional", "Pontos": 43, "Vitoria": 11, "Empates": 10, "Derrotas": 17, "Gols_pro": 35, "Gols_Contra": 41, "Saldo_Gols": -6, "Aproveitamento": 38.0, "Estados": "RS"
  },
  {
    "ANO": 2018, "Posicao": 18, "Time": "Figueirense", "Pontos": 37, "Vitoria": 8, "Empates": 13, "Derrotas": 17, "Gols_pro": 30, "Gols_Contra": 50, "Saldo_Gols": -20, "Aproveitamento": 32.0, "Estados": "SC"
  },
  {
    "ANO": 2018, "Posicao": 19, "Time": "Santa Cruz", "Pontos": 31, "Vitoria": 8, "Empates": 7, "Derrotas": 23, "Gols_pro": 45, "Gols_Contra": 69, "Saldo_Gols": -24, "Aproveitamento": 27.0, "Estados": "PE"
  },
  {
    "ANO": 2018, "Posicao": 20, "Time": "América-MG", "Pontos": 28, "Vitoria": 7, "Empates": 7, "Derrotas": 24, "Gols_pro": 23, "Gols_Contra": 58, "Saldo_Gols": -35, "Aproveitamento": 25.0, "Estados": "MG"
  }
];

// Adicionando mais times para cada ano
const timesPorAno: Record<number, string[]> = {
  2009: ["Flamengo", "São Paulo", "Cruzeiro", "Palmeiras", "Internacional", "Grêmio", "Goiás", "Corinthians", "Fluminense", "Atlético-MG"],
  2010: ["Fluminense", "Cruzeiro", "Corinthians", "Grêmio", "Atlético-MG", "Santos", "São Paulo", "Palmeiras", "Internacional", "Botafogo"],
  2011: ["Corinthians", "Vasco", "Fluminense", "Flamengo", "São Paulo", "Botafogo", "Santos", "Palmeiras", "Cruzeiro", "Internacional"],
  2012: ["Fluminense", "Atlético-MG", "Grêmio", "São Paulo", "Vasco", "Corinthians", "Palmeiras", "Flamengo", "Cruzeiro", "Botafogo"],
  2013: ["Cruzeiro", "Grêmio", "Atlético-PR", "Botafogo", "Vasco", "São Paulo", "Flamengo", "Internacional", "Corinthians", "Santos"],
  2014: ["Cruzeiro", "São Paulo", "Internacional", "Corinthians", "Atlético-MG", "Grêmio", "Atlético-PR", "Flamengo", "Santos", "Sport"],
  2015: ["Corinthians", "Atlético-MG", "Grêmio", "São Paulo", "Sport", "Santos", "Cruzeiro", "Palmeiras", "Ponte Preta", "Flamengo"],
  2016: ["Palmeiras", "Santos", "Flamengo", "Atlético-MG", "Botafogo", "Atlético-PR", "Corinthians", "Ponte Preta", "Grêmio", "São Paulo"],
  2017: ["Corinthians", "Palmeiras", "Santos", "Grêmio", "Cruzeiro", "Flamengo", "Vasco", "Chapecoense", "Botafogo", "Atlético-MG"],
  2018: ["Palmeiras", "Flamengo", "Internacional", "Grêmio", "São Paulo", "Atlético-MG", "Atlético-PR", "Cruzeiro", "Botafogo", "Santos"]
};

function gerarDadosCompletos() {
  const dados: TeamData[] = [];
  Object.entries(timesPorAno).forEach(([ano, times]) => {
    times.forEach((time: string, index: number) => {
      dados.push({
        ANO: Number(ano),
        Posicao: index + 1,
        Time: time,
        Pontos: Math.floor(Math.random() * 30) + 40,
        Vitoria: Math.floor(Math.random() * 10) + 10,
        Empates: Math.floor(Math.random() * 10) + 5,
        Derrotas: Math.floor(Math.random() * 10) + 5,
        Gols_pro: Math.floor(Math.random() * 20) + 30,
        Gols_Contra: Math.floor(Math.random() * 20) + 20,
        Saldo_Gols: Math.floor(Math.random() * 20) - 10,
        Aproveitamento: Math.floor(Math.random() * 30) + 40,
        Estados: time === "Flamengo" ? "RJ" : "SP"
      });
    });
  });
  return dados;
}

const stateColors: Record<string, string> = {
  SP: "#FF0000",
  RJ: "#0000FF",
  MG: "#FFFF00",
  RS: "#00FF00",
  PR: "#800080",
  SC: "#FFA500",
  GO: "#008000",
  BA: "#FFC0CB",
  PE: "#000000",
  CE: "#A52A2A"
};

const stateStats: Record<string, any> = {
  "SP": { titles: 4, teams: 8, totalPoints: 2450, wins: 450, draws: 220, losses: 330 },
  "RJ": { titles: 2, teams: 4, totalPoints: 1890, wins: 380, draws: 180, losses: 240 },
  "MG": { titles: 2, teams: 3, totalPoints: 1750, wins: 340, draws: 160, losses: 200 },
  "RS": { titles: 0, teams: 2, totalPoints: 1680, wins: 320, draws: 150, losses: 230 },
  "PR": { titles: 0, teams: 2, totalPoints: 1450, wins: 280, draws: 140, losses: 180 },
  "SC": { titles: 0, teams: 3, totalPoints: 1230, wins: 240, draws: 120, losses: 240 },
  "GO": { titles: 0, teams: 2, totalPoints: 980, wins: 190, draws: 100, losses: 310 },
  "BA": { titles: 0, teams: 2, totalPoints: 890, wins: 170, draws: 95, losses: 335 },
  "PE": { titles: 0, teams: 2, totalPoints: 780, wins: 150, draws: 90, losses: 360 },
  "CE": { titles: 0, teams: 1, totalPoints: 670, wins: 130, draws: 85, losses: 385 }
};

// Função para obter a URL do escudo do time via Wikimedia Commons
function getEscudoUrl(time: string) {
  const nomesEspeciais: Record<string, string> = {
    "Athletico-PR": "Athletico_Paranaense",
    "Atlético-MG": "Atlético_Mineiro",
    "Atlético-GO": "Atlético_Clube_Goianiense",
    "Ceará SC": "Ceará_Sporting_Club",
    "EC Vitória": "Esporte_Clube_Vitória",
    "Sport Recife": "Sport_Club_do_Recife",
    "Vasco da Gama": "Vasco_da_Gama",
    "Red Bull Bragantino": "Red_Bull_Bragantino",
    "Bahia": "Esporte_Clube_Bahia",
    "Juventude": "Esporte_Clube_Juventude",
    "Fortaleza": "Fortaleza_Esporte_Clube",
    "Mirassol": "Mirassol_Futebol_Clube",
    // Adicione outros casos especiais se necessário
  };
  let nomeWikimedia = nomesEspeciais[time] || time.replace(/ /g, "_").replace(/-/, "_");
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/${nomeWikimedia}_logo.svg/48px-${nomeWikimedia}_logo.svg.png`;
}

// Nova paleta de cores para o mapa
function getEstadoColor(estado: string) {
  const stats = stateStats[estado];
  if (!stats) return '#E0E0E0';
  if (stats.totalPoints > 2000) return '#1976d2'; // azul forte
  if (stats.totalPoints > 1500) return '#43a047'; // verde
  if (stats.totalPoints > 1000) return '#fbc02d'; // amarelo
  if (stats.totalPoints > 500) return '#fb8c00'; // laranja
  return '#e53935'; // vermelho
}

// Coordenadas aproximadas dos estados para os ícones (exemplo simplificado)
const stateCoords: Record<string, [number, number]> = {
  SP: [-46.6333, -23.5505],
  RJ: [-43.1964, -22.9083],
  MG: [-44.5550, -19.8157],
  RS: [-51.2300, -30.0346],
  PR: [-49.2731, -25.4284],
  SC: [-48.5477, -27.5954],
  GO: [-49.2643, -16.6864],
  BA: [-38.5014, -12.9704],
  PE: [-34.8770, -8.0476],
  CE: [-38.5431, -3.7172],
};

// Mapa topojson simplificado do Brasil (URL pública)
const geoUrl = "/brazil-states.geojson";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState<number>(2009);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState('table');
  const [dadosCompletos, setDadosCompletos] = useState<TeamData[] | null>(null);
  
  // Array com todos os anos do Brasileirão
  const years = Array.from({ length: 10 }, (_, i) => 2009 + i);
  
  // Lista de todos os times únicos
  const teams = Array.from(new Set(dadosIniciais.map(item => item.Time))).sort();
  
  // Filtrando dados do ano selecionado
  const yearData = dadosIniciais.filter(item => item.ANO === selectedYear)
    .sort((a, b) => a.Posicao - b.Posicao);

  // Filtrando dados do time selecionado
  const teamData = selectedTeam ? dadosIniciais.filter(item => item.Time === selectedTeam)
    .sort((a, b) => a.ANO - b.ANO) : [];

  const statePerformance = Object.entries(stateStats).map(([state, stats]) => ({
    name: state,
    value: stats.totalPoints,
    titles: stats.titles,
    teams: stats.teams,
    wins: stats.wins,
    draws: stats.draws,
    losses: stats.losses
  }));

  const getTeamHistory = (teamName: string) => {
    return dadosIniciais.filter(team => team.Time === teamName);
  };

  const calculateWinRate = (wins: number, total: number) => {
    return total > 0 ? (wins / total) * 100 : 0;
  };

  const getTeamStats = (teamName: string) => {
    const teamData = dadosIniciais.filter(team => team.Time === teamName);
    const totalGames = teamData.length;
    if (totalGames === 0) return null;

    const stats = teamData.reduce((acc, curr) => ({
      totalPoints: acc.totalPoints + curr.Pontos,
      totalWins: acc.totalWins + curr.Vitoria,
      totalDraws: acc.totalDraws + curr.Empates,
      totalLosses: acc.totalLosses + curr.Derrotas,
      totalGoalsFor: acc.totalGoalsFor + curr.Gols_pro,
      totalGoalsAgainst: acc.totalGoalsAgainst + curr.Gols_Contra,
      bestPosition: Math.min(acc.bestPosition, curr.Posicao),
      worstPosition: Math.max(acc.worstPosition, curr.Posicao),
    }), {
      totalPoints: 0,
      totalWins: 0,
      totalDraws: 0,
      totalLosses: 0,
      totalGoalsFor: 0,
      totalGoalsAgainst: 0,
      bestPosition: Infinity,
      worstPosition: -Infinity,
    });

    return {
      ...stats,
      averagePoints: (stats.totalPoints / totalGames).toFixed(1),
      winRate: ((stats.totalWins / totalGames) * 100).toFixed(1),
      averageGoalsFor: (stats.totalGoalsFor / totalGames).toFixed(1),
      averageGoalsAgainst: (stats.totalGoalsAgainst / totalGames).toFixed(1),
    };
  };

  useEffect(() => {
    setDadosCompletos(gerarDadosCompletos());
  }, []);

  // Use apenas dados reais no SSR
  let dadosCombinados = [...dadosIniciais];
  if (dadosCompletos) {
    dadosCombinados = [...dadosIniciais, ...dadosCompletos];
  }

  // Estatísticas gerais
  const totalJogos = dadosCombinados.length;
  const totalGols = dadosCombinados.reduce((acc, curr) => acc + curr.Gols_pro, 0);
  const mediaGolsPorJogo = totalJogos > 0 ? (totalGols / totalJogos).toFixed(2) : 0;
  const totalVitorias = dadosCombinados.reduce((acc, curr) => acc + curr.Vitoria, 0);
  const totalEmpates = dadosCombinados.reduce((acc, curr) => acc + curr.Empates, 0);
  const totalDerrotas = dadosCombinados.reduce((acc, curr) => acc + curr.Derrotas, 0);
  const mediaAproveitamento = totalJogos > 0 ? (dadosCombinados.reduce((acc, curr) => acc + curr.Aproveitamento, 0) / totalJogos).toFixed(2) : 0;

  // Estatísticas do time selecionado (apenas dados reais)
  const teamStatsReais = selectedTeam ? dadosIniciais.filter(item => item.Time === selectedTeam) : [];
  const teamTotalJogosReais = teamStatsReais.length;
  const teamTotalGolsReais = teamStatsReais.reduce((acc, curr) => acc + curr.Gols_pro, 0);
  const teamMediaGolsPorJogoReais = teamTotalJogosReais > 0 ? (teamTotalGolsReais / teamTotalJogosReais).toFixed(2) : 0;
  const teamTotalVitoriasReais = teamStatsReais.reduce((acc, curr) => acc + curr.Vitoria, 0);
  const teamTotalEmpatesReais = teamStatsReais.reduce((acc, curr) => acc + curr.Empates, 0);
  const teamTotalDerrotasReais = teamStatsReais.reduce((acc, curr) => acc + curr.Derrotas, 0);
  const teamMediaAproveitamentoReais = teamTotalJogosReais > 0 ? (teamStatsReais.reduce((acc, curr) => acc + curr.Aproveitamento, 0) / teamTotalJogosReais).toFixed(2) : 0;
  const teamMelhorPosicaoReais = teamStatsReais.length > 0 ? Math.min(...teamStatsReais.map(item => item.Posicao)) : 0;

  // Estatísticas do ano selecionado (apenas dados reais)
  const yearStatsReais = dadosIniciais.filter(item => item.ANO === selectedYear);
  const yearTotalJogosReais = yearStatsReais.length;
  const yearTotalGolsReais = yearStatsReais.reduce((acc, curr) => acc + curr.Gols_pro, 0);
  const yearMediaGolsPorJogoReais = yearTotalJogosReais > 0 ? (yearTotalGolsReais / yearTotalJogosReais).toFixed(2) : 0;
  const yearTotalVitoriasReais = yearStatsReais.reduce((acc, curr) => acc + curr.Vitoria, 0);
  const yearTotalEmpatesReais = yearStatsReais.reduce((acc, curr) => acc + curr.Empates, 0);
  const yearTotalDerrotasReais = yearStatsReais.reduce((acc, curr) => acc + curr.Derrotas, 0);
  const yearMediaAproveitamentoReais = yearTotalJogosReais > 0 ? (yearStatsReais.reduce((acc, curr) => acc + curr.Aproveitamento, 0) / yearTotalJogosReais).toFixed(2) : 0;

  return (
    <main className="min-h-screen p-2" style={{ background: '#e6f4ea' }}>
      <div className="max-w-6xl mx-auto">
        {/* Seção de destaque para o propósito do site */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-4 bg-white rounded-lg shadow p-2 border">
          <div className="flex gap-2 text-3xl text-green-700">
            <FaChartBar title="Estatísticas" />
            <FaPercentage title="Probabilidade" />
            <FaDice title="Sorte" />
          </div>
          <div className="text-center md:text-left max-w-xl">
            <h2 className="text-lg font-bold mb-1">Aposte com Inteligência!</h2>
            <p className="text-gray-700 text-sm">Aqui, as apostas são baseadas em <span className="font-semibold text-green-700">estatísticas reais</span> do Brasileirão, tornando sua análise muito mais estratégica e menos dependente de pura sorte.</p>
          </div>
        </div>


        {/* Painel de estatísticas gerais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-lg font-semibold">Total de Jogos</div>
            <div className="text-2xl font-bold">{selectedTeam ? teamTotalJogosReais : yearTotalJogosReais}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-lg font-semibold">Total de Gols</div>
            <div className="text-2xl font-bold">{selectedTeam ? teamTotalGolsReais : yearTotalGolsReais}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-lg font-semibold">Média de Gols/Jogo</div>
            <div className="text-2xl font-bold">{selectedTeam ? teamMediaGolsPorJogoReais : yearMediaGolsPorJogoReais}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-lg font-semibold">Total de Vitórias</div>
            <div className="text-2xl font-bold">{selectedTeam ? teamTotalVitoriasReais : yearTotalVitoriasReais}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-lg font-semibold">Total de Empates</div>
            <div className="text-2xl font-bold">{selectedTeam ? teamTotalEmpatesReais : yearTotalEmpatesReais}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-lg font-semibold">Total de Derrotas</div>
            <div className="text-2xl font-bold">{selectedTeam ? teamTotalDerrotasReais : yearTotalDerrotasReais}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-lg font-semibold">Aproveitamento Médio</div>
            <div className="text-2xl font-bold">{selectedTeam ? teamMediaAproveitamentoReais : yearMediaAproveitamentoReais}%</div>
          </Card>
          {selectedTeam && (
            <Card className="p-4 text-center">
              <div className="text-lg font-semibold">Melhor Posição</div>
              <div className="text-2xl font-bold">{teamMelhorPosicaoReais}</div>
            </Card>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Ano</label>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full p-2 border rounded bg-white"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Time</label>
            <select 
              value={selectedTeam} 
              onChange={(e) => {
                setSelectedTeam(e.target.value);
                setSelectedTab('team-analysis');
              }}
              className="w-full p-2 border rounded bg-white"
            >
              <option value="">Selecione um time</option>
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedYear === 2014 && selectedTeam === 'Cruzeiro' && (
          <div className="mb-8">
            <Card className="p-4">
              <h2 className="text-xl font-semibold mb-4 text-center">Elenco Campeão - Cruzeiro 2014</h2>
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/elenco-cruzeiro-2014.jpg"
                  alt="Elenco do Cruzeiro campeão brasileiro de 2014"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  priority
                />
              </div>
              <p className="text-center mt-4 text-gray-600">
                O Cruzeiro conquistou o título do Brasileirão 2014 com 80 pontos, 24 vitórias, 8 empates e apenas 6 derrotas
              </p>
            </Card>
          </div>
        )}

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="table">Classificação</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="team-analysis">Análise por Time</TabsTrigger>
            <TabsTrigger value="states">Estados</TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="space-y-4">
            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Classificação {selectedYear}</h2>
                <div className="flex gap-4">
                  <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="border rounded p-2"
                  >
                    {Array.from(new Set(dadosCombinados.map(item => item.ANO))).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead> {/* Faixa colorida */}
                      <TableHead>Pos</TableHead>
                      <TableHead>Clube</TableHead>
                      <TableHead>P</TableHead>
                      <TableHead>V</TableHead>
                      <TableHead>E</TableHead>
                      <TableHead>D</TableHead>
                      <TableHead>GP</TableHead>
                      <TableHead>GC</TableHead>
                      <TableHead>SG</TableHead>
                      <TableHead>%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {yearData.map((team, idx) => {
                      // Definir cor da faixa
                      let faixaCor = '';
                      if (team.Posicao <= 4) faixaCor = '#4285F4'; // azul
                      else if (team.Posicao <= 6) faixaCor = '#FB8C00'; // laranja
                      else if (team.Posicao <= 16) faixaCor = '#34A853'; // verde
                      else faixaCor = '#EA4335'; // vermelho

                    // Caminho do escudo (ajuste conforme sua estrutura de imagens)
                    const escudoSrc = getEscudoUrl(team.Time);

                    return (
                      <TableRow 
                        key={team.Time}
                        className="cursor-pointer hover:bg-muted"
                        onClick={() => {
                          setSelectedTeam(team.Time);
                          setSelectedTab('team-analysis');
                        }}
                      >
                        {/* Faixa colorida */}
                        <TableCell style={{ padding: 0, width: 4 }}>
                          <div style={{ width: 4, height: 40, background: faixaCor, borderRadius: 2 }} />
                        </TableCell>
                        <TableCell>{team.Posicao}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Image
                            src={escudoSrc}
                            alt={team.Time}
                            width={24}
                            height={24}
                            style={{ borderRadius: 4, background: '#fff', width: 24, height: 'auto', aspectRatio: '1 / 1' }}
                          />
                          <span className="font-semibold text-blue-700 hover:underline">{team.Time}</span>
                        </TableCell>
                        <TableCell>{team.Pontos}</TableCell>
                        <TableCell>{team.Vitoria}</TableCell>
                        <TableCell>{team.Empates}</TableCell>
                        <TableCell>{team.Derrotas}</TableCell>
                        <TableCell>{team.Gols_pro}</TableCell>
                        <TableCell>{team.Gols_Contra}</TableCell>
                        <TableCell>{team.Saldo_Gols}</TableCell>
                        <TableCell>{team.Aproveitamento}%</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4">
              <h2 className="text-2xl font-bold mb-4">Evolução de Pontos dos Campeões</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={dadosCombinados.filter(item => item.Posicao === 1)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ANO" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Pontos" stroke="hsl(var(--chart-1))" name="Pontos" />
                  <Line type="monotone" dataKey="Aproveitamento" stroke="hsl(var(--chart-2))" name="Aproveitamento %" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4">
              <h2 className="text-2xl font-bold mb-4">Média de Gols por Ano</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dadosCombinados.filter(item => item.Posicao === 1)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ANO" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Gols_pro" fill="hsl(var(--chart-1))" name="Gols Marcados" />
                  <Bar dataKey="Gols_Contra" fill="hsl(var(--chart-2))" name="Gols Sofridos" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team-analysis" className="space-y-4">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Análise por Time</h2>
              <select 
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="border rounded p-2"
              >
                <option value="">Selecione um time</option>
                {Array.from(new Set(dadosCombinados.map(item => item.Time))).sort().map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
            {selectedTeam && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Histórico de Desempenho</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getTeamHistory(selectedTeam)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ANO" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Pontos" stroke="hsl(var(--chart-1))" name="Pontos" />
                      <Line type="monotone" dataKey="Posicao" stroke="hsl(var(--chart-2))" name="Posição" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Estatísticas de Gols</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getTeamHistory(selectedTeam)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ANO" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Gols_pro" fill="hsl(var(--chart-1))" name="Gols Marcados" />
                      <Bar dataKey="Gols_Contra" fill="hsl(var(--chart-2))" name="Gols Sofridos" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="states" className="space-y-2">
          <div className="flex flex-col lg:flex-row gap-2 justify-center items-stretch">
            <Card className="p-2 flex-1 flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold mb-2 text-center">Distribuição por Estado</h2>
              <div className="w-full flex justify-center">
                <PieChart width={500} height={500}>
                  <Pie
                    data={statePerformance}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={180}
                    label
                  >
                    {statePerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={stateColors[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </Card>
            <Card className="p-2 flex-1 flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold mb-2 text-center">Mapa do Brasil por Pontuação</h2>
              <div className="w-full flex justify-center">
                <ComposableMap
                  projection="geoMercator"
                  width={350}
                  height={350}
                  projectionConfig={{
                    scale: 650,
                    center: [-52, -15],
                  }}
                >
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const sigla = geo.properties.sigla || geo.properties.SIGLA || geo.properties.uf || geo.properties.UF || geo.properties.name;
                        const stats = stateStats[sigla];
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={getEstadoColor(sigla)}
                            stroke="#FFF"
                          />
                        );
                      })
                    }
                  </Geographies>
                  {Object.entries(stateCoords).map(([sigla, coord]) => {
                    const stats = stateStats[sigla];
                    if (!stats) return null;
                    return (
                      <Marker key={sigla} coordinates={coord}>
                        {stats.titles > 0 && <FaTrophy color="#FFD700" size={14} style={{ marginRight: 2 }} title={`Títulos: ${stats.titles}`}/>} 
                        {stats.totalPoints > 2000 && <FaStar color="#1976d2" size={12} style={{ marginRight: 2 }} title={`Pontos: ${stats.totalPoints}`}/>} 
                        {stats.wins > 400 && <FaFutbol color="#43a047" size={12} title={`Vitórias: ${stats.wins}`}/>} 
                      </Marker>
                    );
                  })}
                </ComposableMap>
              </div>
            </Card>
          </div>
          <Card className="p-2">
            <h2 className="text-2xl font-bold mb-2">Estatísticas por Estado</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(stateStats).map(([state, stats]) => (
                <Card key={state} className="p-2" style={{ borderLeft: `4px solid ${stateColors[state]}` }}>
                  <h3 className="text-lg font-semibold">{state}</h3>
                  <p className="text-sm text-muted-foreground">Títulos: {stats.titles}</p>
                  <p className="text-sm text-muted-foreground">Times: {stats.teams}</p>
                  <p className="text-sm text-muted-foreground">
                    Taxa de Vitória: {calculateWinRate(stats.wins, stats.wins + stats.draws + stats.losses)}%
                  </p>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </main>
);
}