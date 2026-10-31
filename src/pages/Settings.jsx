import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/common/Button';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';
import { useDashboard } from '../context/DashboardContext';
import { useTheme } from '../context/ThemeContext';
import {
  User,
  Palette,
  Bell,
  Sliders,
  RotateCcw,
  Check,
  Shield,
  Sun,
  Moon,
  Sparkles,
  Camera,
} from 'lucide-react';
import toast from 'react-hot-toast';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
];

export default function Settings() {
  const { userProfile, updateUserProfile, resetDemoData } = useDashboard();
  const { theme, setTheme } = useTheme();

  const [activeTab, setActiveTab] = useState('profile');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Form states
  const [profileForm, setProfileForm] = useState({
    fullName: userProfile.fullName,
    email: userProfile.email,
    role: userProfile.role,
    avatar: userProfile.avatar,
    currency: userProfile.currency,
    timezone: userProfile.timezone,
    language: userProfile.language,
    notifications: { ...userProfile.notifications },
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(profileForm);
  };

  const toggleNotification = (key) => {
    const updated = {
      ...profileForm,
      notifications: {
        ...profileForm.notifications,
        [key]: !profileForm.notifications[key],
      },
    };
    setProfileForm(updated);
    updateUserProfile(updated);
  };

  const handlePreferenceChange = (key, value) => {
    const updated = { ...profileForm, [key]: value };
    setProfileForm(updated);
    updateUserProfile(updated);
  };

  return (
    <PageLayout
      title="System & Account Settings"
      subtitle="Manage profile identity, theme preferences, notifications and persistent storage"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <div className="md:col-span-1 space-y-1">
          {[
            { id: 'profile', label: 'Profile Details', icon: User },
            { id: 'appearance', label: 'Appearance & Theme', icon: Palette },
            { id: 'notifications', label: 'Notification Alerts', icon: Bell },
            { id: 'preferences', label: 'Regional & Currency', icon: Sliders },
            { id: 'data', label: 'Demo Data Storage', icon: RotateCcw },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                  isCurrent
                    ? 'bg-violet-600/15 text-violet-300 font-semibold border border-violet-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-violet-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div className="md:col-span-3">
          {/* PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark">
              <h3 className="text-base font-semibold text-white mb-1">Personal Profile</h3>
              <p className="text-xs text-slate-400 mb-6">
                Update account photo and corporate administrative details
              </p>

              <form onSubmit={handleProfileSubmit} className="space-y-6">
                {/* Avatar selection */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <img
                      src={profileForm.avatar}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full object-cover border-2 border-violet-500/50 shadow-md"
                    />
                    <div>
                      <div className="text-xs text-slate-400 mb-2">Select from avatar presets:</div>
                      <div className="flex items-center gap-2">
                        {AVATAR_OPTIONS.map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            alt={`Option ${i}`}
                            onClick={() => setProfileForm({ ...profileForm, avatar: url })}
                            className={`w-9 h-9 rounded-full object-cover cursor-pointer border-2 transition-all ${
                              profileForm.avatar === url
                                ? 'border-violet-500 ring-2 ring-violet-500/30'
                                : 'border-[#252B38] opacity-60 hover:opacity-100'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.fullName}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, fullName: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, email: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Role / Job Title
                  </label>
                  <input
                    type="text"
                    value={profileForm.role}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, role: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="pt-4 border-t border-[#252B38] flex justify-end">
                  <Button type="submit" variant="primary" size="md">
                    Save Profile Changes
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* APPEARANCE */}
          {activeTab === 'appearance' && (
            <div className="p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark">
              <h3 className="text-base font-semibold text-white mb-1">Interface Appearance</h3>
              <p className="text-xs text-slate-400 mb-6">
                Choose your preferred workspace theme aesthetic
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dark mode option */}
                <div
                  onClick={() => setTheme('dark')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    theme === 'dark'
                      ? 'border-violet-500 bg-[#10131B]'
                      : 'border-[#252B38] bg-[#0B0D12] opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Moon className="w-4 h-4 text-violet-400" />
                      <span>Dark Obsidian (Default)</span>
                    </div>
                    {theme === 'dark' && (
                      <span className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-white">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className="h-20 rounded-lg bg-[#0B0D12] border border-[#252B38] p-2 flex flex-col justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-6 h-2 rounded bg-violet-500"></div>
                      <div className="w-12 h-2 rounded bg-slate-700"></div>
                    </div>
                    <div className="h-8 rounded bg-[#151923] border border-[#252B38]"></div>
                  </div>
                </div>

                {/* Light mode option */}
                <div
                  onClick={() => setTheme('light')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    theme === 'light'
                      ? 'border-violet-500 bg-[#10131B]'
                      : 'border-[#252B38] bg-[#0B0D12] opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Clean Slate Light</span>
                    </div>
                    {theme === 'light' && (
                      <span className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-white">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className="h-20 rounded-lg bg-[#F8FAFC] border border-slate-300 p-2 flex flex-col justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-6 h-2 rounded bg-violet-600"></div>
                      <div className="w-12 h-2 rounded bg-slate-400"></div>
                    </div>
                    <div className="h-8 rounded bg-white border border-slate-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark">
              <h3 className="text-base font-semibold text-white mb-1">Notification Preferences</h3>
              <p className="text-xs text-slate-400 mb-6">
                Choose what notifications and alerts you receive
              </p>

              <div className="space-y-4">
                {[
                  {
                    key: 'email',
                    title: 'Email Notifications',
                    desc: 'Receive digest summaries of monthly revenues and KPI reports.',
                  },
                  {
                    key: 'productUpdates',
                    title: 'Product & Catalog Updates',
                    desc: 'Notify when inventory falls below minimum safety stock.',
                  },
                  {
                    key: 'securityAlerts',
                    title: 'Security & Access Alerts',
                    desc: 'Immediate notifications regarding failed transactions and auth changes.',
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="p-4 rounded-xl bg-[#10131B]/60 border border-[#252B38] flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs font-semibold text-white">{item.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleNotification(item.key)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        profileForm.notifications[item.key] ? 'bg-violet-600' : 'bg-slate-700'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          profileForm.notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark space-y-5">
              <div>
                <h3 className="text-base font-semibold text-white mb-1">Regional Preferences</h3>
                <p className="text-xs text-slate-400">
                  Configure default currency formatting and timezone
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Currency Symbol
                  </label>
                  <select
                    value={profileForm.currency}
                    onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Timezone
                  </label>
                  <select
                    value={profileForm.timezone}
                    onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="UTC -08:00 (Pacific Time)">UTC -08:00 (Pacific Time)</option>
                    <option value="UTC +00:00 (London GMT)">UTC +00:00 (London GMT)</option>
                    <option value="UTC +01:00 (Central European)">UTC +01:00 (Central European)</option>
                    <option value="UTC +05:00 (Pakistan PKT)">UTC +05:00 (Pakistan PKT)</option>
                    <option value="UTC +09:00 (Tokyo JST)">UTC +09:00 (Tokyo JST)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Dashboard Language
                  </label>
                  <select
                    value={profileForm.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0D12] border border-[#252B38] rounded-xl text-xs text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="English (UK)">English (UK)</option>
                    <option value="German (Deutsch)">German (Deutsch)</option>
                    <option value="French (Français)">French (Français)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* DEMO DATA MANAGEMENT */}
          {activeTab === 'data' && (
            <div className="p-6 rounded-2xl bg-[#151923] border border-[#252B38] shadow-card-dark space-y-6">
              <div>
                <h3 className="text-base font-semibold text-white mb-1">Data Storage & Demo Controls</h3>
                <p className="text-xs text-slate-400">
                  NEXUS saves all transactions, created products, notifications, and preferences inside your browser's LocalStorage.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#10131B] border border-amber-500/20 text-xs space-y-2">
                <div className="font-semibold text-amber-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Factory Reset Demo Data</span>
                </div>
                <p className="text-slate-400">
                  If you have added test products or changed settings and wish to revert back to the pristine initial state for presentation, you can reset all records here.
                </p>
                <div className="pt-2">
                  <Button
                    variant="danger"
                    size="sm"
                    icon={RotateCcw}
                    onClick={() => setIsResetConfirmOpen(true)}
                  >
                    Reset Demo Data
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={resetDemoData}
        title="Reset Demo Data?"
        message="This will clear your local modifications (custom products, modified transaction states, read notifications) and restore the default dataset."
        confirmLabel="Reset Everything"
      />
    </PageLayout>
  );
}
