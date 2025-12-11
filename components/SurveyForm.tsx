import React, { useState, useEffect } from 'react';
import { Send, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import { DEMO_TRACKS, COLLAB_OPTIONS, INSTRUMENTS, RATING_SCALE } from '../constants';
import { CollaborationStatus } from '../types';

const SurveyForm: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [telegram, setTelegram] = useState('');
  const [role, setRole] = useState('');
  const [collabWillingness, setCollabWillingness] = useState<number | null>(null);
  const [provideCoverArt, setProvideCoverArt] = useState<string>('');
  const [needNewComposition, setNeedNewComposition] = useState<string>('');
  const [notes, setNotes] = useState('');
  
  // Dynamic ratings state map
  const [trackRatings, setTrackRatings] = useState<Record<string, string>>({});
  
  // URL for redirection
  const [nextUrl, setNextUrl] = useState('');

  useEffect(() => {
    const baseUrl = window.location.href.split('#')[0];
    setNextUrl(`${baseUrl}#/thanks`);
  }, []);

  const handleRatingChange = (trackId: string, value: string) => {
    setTrackRatings(prev => ({
        ...prev,
        [trackId]: value
    }));
  };

  const isRejecting = status === CollaborationStatus.BUSY || status === CollaborationStatus.OTHER_GROUP;
  const isWilling = status === CollaborationStatus.COMMITTED || status === CollaborationStatus.TENTATIVE;

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-12 pb-24">
      <div className="mb-10">
        {/* Title: 更轻松的标题 */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Music Collab with Shu (@qwq404)</h2>
        <p className="text-slate-400">
            {/* Intro: 更口语化的引导 */}
            Check out the tracks in the sidebar and let me know what you think! :)
        </p>
      </div>

      <form 
        action="https://formsubmit.co/m17314970772@163.com" 
        method="POST"
        className="space-y-12"
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_subject" value="New Music Collaboration Response!" />
        <input type="hidden" name="_next" value={nextUrl} />

        {/* --- MOVED: Telegram is now Question 01 --- */}
        <section className="space-y-2">
          <label className="block text-neon-blue font-mono text-lg">
            01. First off, what's your Telegram? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="telegram_handle"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="@username"
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
          />
        </section>

        {/* --- Intent is now Question 02 --- */}
        <section className="space-y-4">
          <label className="block text-neon-blue font-mono text-lg mb-2">
            02. So, what's the plan? <span className="text-red-500">*</span>
          </label>
          <div className="grid gap-4">
            {COLLAB_OPTIONS.map((option) => (
              <label 
                key={option.value}
                className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                    status === option.value 
                    ? 'border-neon-pink bg-neon-pink/10 ring-1 ring-neon-pink' 
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
                }`}
              >
                <input
                  type="radio"
                  name="collaboration_intent"
                  value={option.value}
                  checked={status === option.value}
                  onChange={(e) => setStatus(e.target.value)}
                  className="sr-only"
                  required
                />
                <div className="flex-1">
                  <div className="font-semibold text-slate-200">{option.label}</div>
                  <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{option.desc}</div>
                </div>
                {status === option.value && <CheckCircle2 className="text-neon-pink w-6 h-6 ml-4" />}
              </label>
            ))}
          </div>
        </section>

        {/* Conditional Logic: If Reject */}
        {isRejecting && (
            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg text-center animate-fade-in">
                <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl text-white font-bold mb-2">No worries!</h3>
                <p className="text-slate-400 mb-6">"Life happens. Catch you next time."</p>
                <button 
                    type="submit" 
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full transition-all"
                >
                    Send (Let me know you saw this)
                </button>
            </div>
        )}

        {/* Conditional Logic: If Willing */}
        {isWilling && (
          <div className="space-y-12 animate-fade-in-up">
            
            {/* Track Ratings (Renumbered to 03) */}
            <section className="space-y-6">
              <label className="block text-neon-blue font-mono text-lg">
                03. Vibe Check: How do you like these demos? <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 text-sm text-yellow-500 bg-yellow-500/10 p-3 rounded border border-yellow-500/20">
                 <AlertCircle size={16} />
                 <span>1 = Nah, 10 = Love it. (Don't sit on the fence!)</span>
              </div>
              
              <div className="grid gap-6">
                {DEMO_TRACKS.map((track) => (
                    <div key={track.id} className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                        <h4 className="font-bold text-white mb-4">{track.title} <span className="text-slate-500 font-normal">by {track.artist}</span></h4>
                        
                        <div className="space-y-4">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    {RATING_SCALE.map(num => (
                                        <label key={num} className="cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name={`rating_${track.id}`} 
                                                value={num}
                                                required
                                                className="peer sr-only"
                                                onChange={(e) => handleRatingChange(track.id, e.target.value)}
                                            />
                                            <span className="block w-10 h-10 leading-10 text-center rounded bg-slate-800 text-slate-400 peer-checked:bg-neon-purple peer-checked:text-white transition-all hover:bg-slate-700">
                                                {num}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
            </section>

             {/* New Composition (Renumbered to 04) */}
             <section className="space-y-4">
              <label className="block text-neon-blue font-mono text-lg">
                04. Prefer a fresh track? (Maybe we start from scratch together?) <span className="text-red-500">*</span>
              </label>
              {/* 修正了 typo: Iet -> Let */}
              <p className="text-sm text-slate-400 -mt-2">Let me know if the existing ones don't match your vibe.</p>
              <div className="flex gap-6">
                {['Yes, I need something fresh.', 'No, existing styles are cool.'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="need_new_composition" 
                            value={opt} 
                            required
                            className="w-5 h-5 accent-neon-pink"
                            onChange={(e) => setNeedNewComposition(e.target.value)}
                        />
                        <span className="text-slate-200">{opt}</span>
                    </label>
                ))}
              </div>
            </section>

            {/* Instrument Role (Renumbered to 05) */}
            <section className="space-y-4">
              <label className="block text-neon-blue font-mono text-lg">
                05. What instrument do you want to play? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INSTRUMENTS.map((inst) => (
                   <label key={inst} className="cursor-pointer">
                        <input 
                            type="radio" 
                            name="instrument_role" 
                            value={inst} 
                            required 
                            className="peer sr-only"
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <div className="p-3 rounded border border-slate-700 bg-slate-900 text-slate-300 peer-checked:border-neon-blue peer-checked:text-neon-blue peer-checked:bg-neon-blue/10 transition-all text-center">
                            {inst}
                        </div>
                   </label> 
                ))}
              </div>
            </section>

            {/* General Willingness (Renumbered to 06) */}
            <section className="space-y-4">
              <label className="block text-neon-blue font-mono text-lg">
                06. Down to jam with other instruments? <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-slate-400 -mt-2">1 = Nope, 10 = Sure!</p>
              <div className="flex flex-wrap gap-2">
                {RATING_SCALE.map(num => (
                    <label key={num} className="cursor-pointer">
                        <input 
                            type="radio" 
                            name="collab_willingness_score" 
                            value={num}
                            required
                            className="peer sr-only"
                            onChange={(e) => setCollabWillingness(Number(e.target.value))}
                        />
                        <span className="block w-12 h-12 leading-[3rem] text-center rounded-full bg-slate-800 text-slate-400 peer-checked:bg-neon-blue peer-checked:text-black font-bold transition-all hover:bg-slate-700">
                            {num}
                        </span>
                    </label>
                ))}
              </div>
            </section>

            {/* Cover Art (Renumbered to 07) */}
            <section className="space-y-4">
              <label className="block text-neon-blue font-mono text-lg">
                07. Wanna handle the Cover Art? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                {['Yes', 'No'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="provide_cover_art" 
                            value={opt} 
                            required
                            className="w-5 h-5 accent-neon-pink"
                            onChange={(e) => setProvideCoverArt(e.target.value)}
                        />
                        <span className="text-slate-200 text-lg">{opt}</span>
                    </label>
                ))}
              </div>
            </section>

             {/* Extra Notes (Renumbered to 08) */}
             <section className="space-y-4">
              <label className="block text-neon-blue font-mono text-lg">
                08. Anything else?
              </label>
              <textarea
                name="additional_notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink transition-all"
                placeholder="eg. I want to play multiple instruments...."
              />
            </section>

            {/* Submit Button */}
            <div className="pt-8 border-t border-slate-800">
                <button 
                    type="submit" 
                    className="w-full group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg hover:from-cyan-400 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-blue focus:ring-offset-slate-900"
                >
                    <span className="mr-2">SEND IT</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SurveyForm;
