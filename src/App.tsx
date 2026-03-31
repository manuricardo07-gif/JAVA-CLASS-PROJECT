/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  LayoutDashboard,
  PieChart as PieChartIcon,
  Settings,
  Bell,
  Search
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-4"
  >
    <div className="flex justify-between items-start">
      <div className={cn("p-3 rounded-2xl", color)}>
        <Icon size={24} className="text-white" />
      </div>
      {trend && (
        <div className={cn(
          "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
          trend > 0 ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
        )}>
          {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold mt-1 tracking-tight">${value}</h3>
    </div>
  </motion.div>
);

const InputField = ({ label, value, onChange, icon: Icon }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
        <Icon size={18} />
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
        placeholder="0.00"
      />
    </div>
  </div>
);

export default function App() {
  const [income, setIncome] = useState('5000');
  const [expenses, setExpenses] = useState('3200');

  const stats = useMemo(() => {
    const inc = parseFloat(income) || 0;
    const exp = parseFloat(expenses) || 0;
    const monthly = inc - exp;
    const yearly = monthly * 12;
    const savingsRate = inc > 0 ? Math.round((monthly / inc) * 100) : 0;

    return { inc, exp, monthly, yearly, savingsRate };
  }, [income, expenses]);

  const chartData = [
    { name: 'Income', value: stats.inc, color: '#10b981' },
    { name: 'Expenses', value: stats.exp, color: '#ef4444' },
    { name: 'Savings', value: Math.max(0, stats.monthly), color: '#3b82f6' },
  ];

  const pieData = [
    { name: 'Expenses', value: stats.exp },
    { name: 'Savings', value: Math.max(0, stats.monthly) },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-slate-200 dark:border-slate-800 p-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Wallet className="text-white" size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">FinTrack <span className="text-blue-600">2026</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl font-semibold transition-all">
            <LayoutDashboard size={20} />
            Overview
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-2xl font-medium transition-all">
            <PieChartIcon size={20} />
            Analytics
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-2xl font-medium transition-all">
            <Calendar size={20} />
            Budgeting
          </a>
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 p-4 rounded-3xl bg-slate-100 dark:bg-slate-900">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">Manu Ricardo</p>
              <p className="text-xs text-slate-500 truncate">Premium Member</p>
            </div>
            <Settings size={18} className="text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-12 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Financial Dashboard</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back. Here's your budget overview for March 2026.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
              />
            </div>
            <button className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 transition-colors">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Monthly Income" 
            value={stats.inc.toLocaleString()} 
            icon={TrendingUp} 
            color="bg-emerald-500 shadow-emerald-500/20"
          />
          <StatCard 
            title="Monthly Expenses" 
            value={stats.exp.toLocaleString()} 
            icon={TrendingDown} 
            color="bg-rose-500 shadow-rose-500/20"
          />
          <StatCard 
            title="Monthly Savings" 
            value={stats.monthly.toLocaleString()} 
            icon={PiggyBank} 
            trend={stats.savingsRate}
            color="bg-blue-500 shadow-blue-500/20"
          />
          <StatCard 
            title="Projected Yearly" 
            value={stats.yearly.toLocaleString()} 
            icon={Calendar} 
            color="bg-indigo-500 shadow-indigo-500/20"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Controls & Breakdown */}
          <section className="xl:col-span-1 flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-8 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings size={20} className="text-blue-500" />
                Budget Controls
              </h3>
              <div className="space-y-6">
                <InputField 
                  label="Monthly Income" 
                  value={income} 
                  onChange={setIncome} 
                  icon={TrendingUp}
                />
                <InputField 
                  label="Monthly Expenses" 
                  value={expenses} 
                  onChange={setExpenses} 
                  icon={TrendingDown}
                />
              </div>
              
              <div className="mt-8 p-6 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-500/20">
                <p className="text-blue-100 text-sm font-medium">Savings Rate</p>
                <div className="flex items-end justify-between mt-2">
                  <h4 className="text-4xl font-bold">{stats.savingsRate}%</h4>
                  <div className="text-right">
                    <p className="text-xs text-blue-100 uppercase tracking-widest font-bold">Health</p>
                    <p className="text-sm font-bold">{stats.savingsRate > 20 ? 'Excellent' : 'Needs Work'}</p>
                  </div>
                </div>
                <div className="mt-4 h-2 bg-blue-400/30 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.savingsRate}%` }}
                    className="h-full bg-white"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass p-8 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 flex-1"
            >
              <h3 className="text-xl font-bold mb-6">Expense Allocation</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      <Cell fill="#ef4444" />
                      <Cell fill="#3b82f6" />
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="text-sm font-medium text-slate-500">Expenses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium text-slate-500">Savings</span>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Charts & Visualization */}
          <section className="xl:col-span-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold">Budget Comparison</h3>
                  <p className="text-sm text-slate-500">Visual breakdown of your monthly cash flow</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-xs font-bold bg-slate-100 dark:bg-slate-800 rounded-xl">Monthly</button>
                  <button className="px-4 py-2 text-xs font-bold text-slate-400">Yearly</button>
                </div>
              </div>

              <div className="flex-1 min-h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ 
                        borderRadius: '16px', 
                        border: 'none', 
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                        padding: '12px 16px'
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[12, 12, 12, 12]} 
                      barSize={60}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Smart Insight</h4>
                    <p className="text-sm text-slate-500">
                      {stats.savingsRate > 20 
                        ? "You're saving more than the average user! Consider investing your surplus." 
                        : "Your expenses are high this month. Try reducing non-essential spending by 10%."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}
