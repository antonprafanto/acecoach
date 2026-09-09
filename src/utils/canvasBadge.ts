import { PracticeLog, UserProfile } from '../types';

/**
 * Generate an Instagram/WhatsApp story style badge (1080 x 1350 or 800 x 1000)
 */
export const generateWorkoutBadge = (
  log: PracticeLog,
  profile: UserProfile,
  completedLessonCount: number
): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve('');
      return;
    }

    // 1. Background Gradient (Hard Court Navy to Dark Slate)
    const gradient = ctx.createLinearGradient(0, 0, 800, 1000);
    gradient.addColorStop(0, '#0A192F');
    gradient.addColorStop(1, '#0B0F19');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 1000);

    // 2. Tennis Court Lines Accent (Subtle geometric background)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, 680, 880);
    ctx.beginPath();
    ctx.moveTo(60, 500);
    ctx.lineTo(740, 500); // Net line
    ctx.moveTo(400, 240);
    ctx.lineTo(400, 760); // Center service line
    ctx.stroke();

    // 3. Top Badge & Brand
    ctx.fillStyle = '#CCFF00'; // Optic Yellow
    ctx.font = 'bold 36px Inter, sans-serif';
    ctx.fillText('AceCoach', 90, 130);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '18px Inter, sans-serif';
    ctx.fillText('MODERN TENNIS PATHWAY • PTR / USPTA', 90, 165);

    // 4. Highlight Headline (Focus Stroke)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 46px Inter, sans-serif';
    ctx.fillText(log.focusStroke, 90, 260);

    ctx.fillStyle = '#CCFF00';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText(`Konteks: [${log.context}]`, 90, 305);

    // 5. Stat Box Cards (Duration & RPE)
    // Box 1: Durasi
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.roundRect(90, 360, 290, 150, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(204, 255, 0, 0.2)';
    ctx.stroke();

    ctx.fillStyle = '#94A3B8';
    ctx.font = '18px Inter, sans-serif';
    ctx.fillText('DURASI LATIHAN', 120, 405);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 52px Inter, sans-serif';
    ctx.fillText(`${log.durationMinutes}`, 120, 470);
    ctx.font = '22px Inter, sans-serif';
    ctx.fillText('MENIT', 200, 470);

    // Box 2: RPE (Intensitas)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.roundRect(410, 360, 290, 150, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(204, 255, 0, 0.2)';
    ctx.stroke();

    ctx.fillStyle = '#94A3B8';
    ctx.font = '18px Inter, sans-serif';
    ctx.fillText('INTENSITAS (RPE)', 440, 405);
    ctx.fillStyle = '#CCFF00';
    ctx.font = 'bold 52px Inter, sans-serif';
    ctx.fillText(`${log.rpeRating}`, 440, 470);
    ctx.fillStyle = '#94A3B8';
    ctx.font = '22px Inter, sans-serif';
    ctx.fillText('/ 10', 500, 470);

    // 6. User Level & Milestone
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText(`Pemain: NTRP ${profile.ntrpLevel} • ${profile.handDominance === 'left' ? 'Kidal (Lefty)' : 'Right-Handed'}`, 90, 580);
    ctx.fillStyle = '#94A3B8';
    ctx.font = '18px Inter, sans-serif';
    ctx.fillText(`Kurikulum Dikuasai: ${completedLessonCount} Modul Latihan`, 90, 615);

    // 7. Reflection Note
    if (log.notes) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      ctx.roundRect(90, 660, 610, 150, 16);
      ctx.fill();

      ctx.fillStyle = '#CBD5E1';
      ctx.font = 'italic 20px Inter, sans-serif';
      // Truncate note if too long
      const noteText = log.notes.length > 100 ? log.notes.substring(0, 97) + '...' : log.notes;
      ctx.fillText(`"${noteText}"`, 120, 740);
    }

    // 8. Footer Barcode/Verification
    ctx.fillStyle = '#64748B';
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText(`Tanggal: ${log.date} • Verified by AceCoach Modern Biomechanics`, 90, 890);

    resolve(canvas.toDataURL('image/png'));
  });
};
