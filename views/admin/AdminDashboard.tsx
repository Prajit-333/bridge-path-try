
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';

type AdminNavTab = 'Stats' | 'Users' | 'Content' | 'Settings';
type UserTypeFilter = 'All' | 'Therapists' | 'Parents' | 'Students';

interface AdminUser {
  id: number;
  name: string;
  role: 'Therapist' | 'Parent' | 'Student';
  status: string;
  avatar: string;
  color: string;
  email: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<AdminNavTab>('Users');
  const [userFilter, setUserFilter] = useState<UserTypeFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Local state for users to allow adding/deleting
  const [users, setUsers] = useState<AdminUser[]>([
    { id: 1, name: 'Dr. Sarah Jenkins', role: 'Therapist', status: 'Active', avatar: 'https://picsum.photos/seed/sarah/100', color: 'bg-primary/10', email: 'sarah.j@bridgepath.com' },
    { id: 2, name: 'Michael Thompson', role: 'Parent', status: '2 Students', avatar: 'https://picsum.photos/seed/michael/100', color: 'bg-blue-100', email: 'm.thompson@gmail.com' },
    { id: 3, name: 'Emily Davis', role: 'Student', status: 'Year 4', avatar: 'https://picsum.photos/seed/emily/100', color: 'bg-orange-100', email: 'emily.d@school.edu' },
    { id: 4, name: 'Robert Chen', role: 'Therapist', status: 'Offline', avatar: 'https://picsum.photos/seed/robert/100', color: 'bg-gray-100', email: 'r.chen@therapy.net' },
    { id: 5, name: 'Jessica Lee', role: 'Parent', status: '1 Student', avatar: 'https://picsum.photos/seed/jessica/100', color: 'bg-indigo-100', email: 'jlee@outlook.com' },
    { id: 6, name: 'Alex Rivera', role: 'Student', status: 'Year 6', avatar: 'https://picsum.photos/seed/alex/100', color: 'bg-purple-100', email: 'alex.r@kids.com' },
  ]);

  const statsData = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 520 },
    { name: 'Mar', users: 610 },
    { name: 'Apr', users: 750 },
    { name: 'May', users: 890 },
    { name: 'Jun', users: 920 },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesFilter = userFilter === 'All' || user.role + 's' === userFilter;
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [users, userFilter, searchQuery]);

  const handleAddTherapist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTherapist: AdminUser = {
      id: Date.now(),
      name: formData.get('name') as string,
      role: 'Therapist',
      status: 'Active',
      avatar: `https://picsum.photos/seed/${Date.now()}/100`,
      color: 'bg-primary/10',
      email: formData.get('email') as string,
    };
    setUsers([newTherapist, ...users]);
    setIsAddModalOpen(false);
  };

  const deleteUser = (id: number) => {
    if (confirm('Are you sure you want to remove this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const renderStats = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <section className="grid grid-cols-3 gap-3">
        {[
          { label: 'Therapists', val: '124', trend: '+12%', icon: 'medical_services' },
          { label: 'Parents', val: '850', trend: '+5%', icon: 'family_restroom' },
          { label: 'Students', val: '920', trend: '+8%', icon: 'child_care' },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col gap-1 rounded-xl p-4 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1 opacity-60">
               <span className="material-symbols-outlined text-xs">{stat.icon}</span>
               <p className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
            <p className="text-2xl font-black">{stat.val}</p>
            <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-black">
              <span className="material-symbols-outlined text-[12px]">trending_up</span>
              <span>{stat.trend}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <h3 className="text-sm font-bold mb-6 text-slate-500 uppercase tracking-widest">Platform Growth</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statsData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="users" fill="#4a8fe3" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="bg-primary/5 p-4 rounded-xl border border-primary/10">
        <h4 className="text-xs font-black text-primary uppercase mb-2">System Status</h4>
        <div className="flex items-center gap-2">
          <div className="size-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">All systems operational</span>
        </div>
      </section>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400">search</span>
          <input 
            className="w-full h-12 rounded-xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/50 pl-11 pr-4 text-sm dark:text-white" 
            placeholder="Filter by name or email..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="h-12 w-12 flex items-center justify-center bg-primary text-white rounded-xl shadow-lg shadow-primary/20 active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">person_add</span>
        </button>
      </div>

      <section className="flex gap-4 overflow-x-auto no-scrollbar py-1">
        {(['All', 'Therapists', 'Parents', 'Students'] as UserTypeFilter[]).map((tab) => (
          <button 
            key={tab}
            onClick={() => setUserFilter(tab)}
            className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              userFilter === tab 
              ? 'bg-primary text-white shadow-md' 
              : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </section>

      <section className="flex flex-col divide-y divide-gray-50 dark:divide-slate-800">
        {filteredUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between py-4 group">
            <div className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm" />
              <div>
                <p className="text-sm font-bold">{user.name}</p>
                <p className="text-[10px] text-gray-500 uppercase font-black">{user.role} • {user.status}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-xl">edit</span>
              </button>
              <button 
                onClick={() => deleteUser(user.id)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">delete</span>
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-4 animate-in fade-in duration-300">
      <h3 className="text-lg font-bold mb-4">Content Management</h3>
      {[
        { title: 'AAC Symbols', count: '142 Items', icon: 'category', color: 'text-primary' },
        { title: 'Learning Games', count: '12 Levels', icon: 'extension', color: 'text-orange-500' },
        { title: 'Story Library', count: '45 Books', icon: 'menu_book', color: 'text-purple-500' },
        { title: 'Speech Exercises', count: '80 Phrases', icon: 'mic', color: 'text-green-500' },
      ].map((item, i) => (
        <button key={i} className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-primary/50 transition-all">
          <div className="flex items-center gap-4">
            <div className={`size-10 rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center ${item.color}`}>
              <span className="material-symbols-outlined">{item.icon}</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">{item.title}</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold">{item.count}</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-300">chevron_right</span>
        </button>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
        <h4 className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">Global Preferences</h4>
        <div className="space-y-1">
          {[
            { label: 'Maintenance Mode', icon: 'build', enabled: false },
            { label: 'New Signups Enabled', icon: 'person_add', enabled: true },
            { label: 'API Auto-scaling', icon: 'cloud_sync', enabled: true },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">{s.icon}</span>
                <span className="text-sm font-medium">{s.label}</span>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${s.enabled ? 'bg-primary' : 'bg-slate-200'}`}>
                <div className={`absolute top-0.5 size-4 bg-white rounded-full shadow-sm transition-transform ${s.enabled ? 'right-0.5' : 'left-0.5'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
        <h4 className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">Admin Account</h4>
        <button className="w-full text-left py-2 text-sm font-medium flex items-center gap-3">
          <span className="material-symbols-outlined text-slate-400">security</span>
          Update Security Keys
        </button>
        <button className="w-full text-left py-2 text-sm font-medium flex items-center gap-3">
          <span className="material-symbols-outlined text-slate-400">history</span>
          View Audit Logs
        </button>
      </div>

      <button onClick={() => navigate('/login')} className="w-full py-4 bg-red-50 text-red-500 font-bold text-sm rounded-xl flex items-center justify-center gap-2">
        <span className="material-symbols-outlined">logout</span>
        LOGOUT SYSTEM
      </button>
    </div>
  );

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen text-slate-900 dark:text-slate-100">
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto bg-white dark:bg-slate-900 shadow-2xl">
        <header className="flex items-center bg-white dark:bg-slate-900 px-5 py-5 justify-between border-b border-gray-100 dark:border-slate-800 sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-black leading-none tracking-tight">Admin</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">{activeNav}</p>
          </div>
          <button className="relative w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500">
            <span className="material-symbols-outlined">notifications</span>
            <div className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></div>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-5 pb-32">
          {activeNav === 'Stats' && renderStats()}
          {activeNav === 'Users' && renderUsers()}
          {activeNav === 'Content' && renderContent()}
          {activeNav === 'Settings' && renderSettings()}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto border-t border-gray-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 pb-8 pt-3 z-40">
          <div className="flex justify-between items-center">
            {[
              { id: 'Stats', icon: 'grid_view' },
              { id: 'Users', icon: 'group' },
              { id: 'Content', icon: 'article' },
              { id: 'Settings', icon: 'settings' },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveNav(tab.id as AdminNavTab)}
                className={`flex flex-col items-center gap-1 transition-all ${activeNav === tab.id ? 'text-primary scale-110' : 'text-slate-400 opacity-60'}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: activeNav === tab.id ? "'FILL' 1" : "" }}>
                  {tab.icon}
                </span>
                <p className="text-[10px] font-black uppercase tracking-tighter">{tab.id}</p>
              </button>
            ))}
          </div>
        </nav>

        {/* Add Therapist Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black">Add New Therapist</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
              <form onSubmit={handleAddTherapist} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                  <input name="name" required className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Dr. Jane Foster" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                  <input name="email" type="email" required className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/20" placeholder="jane@bridgepath.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Specialty</label>
                  <select className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/20 text-sm">
                    <option>Speech Therapy</option>
                    <option>Occupational Therapy</option>
                    <option>Behavioral Therapy</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20 mt-4 active:scale-95 transition-transform uppercase tracking-widest">
                  Create Account
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
