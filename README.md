# Silly-Widgy

A task widget for people who need a tiny floating rectangle to remind them what they're supposed to be doing instead of building task widgets.

![Silly-Widgy Preview](resources/screenshoot.png "The widget you built instead of doing actual work")

## What This Actually Is

It's a minimal task bar that hovers on your screen like a persistent reminder of your inability to remember what you were supposed to be working on. Built with Electron because apparently we need an entire Chromium browser to display a single line of text.

Features that seemed important at 3 AM:
- **Always-on-top Widget**: A floating bar that judges you silently from the corner of your screen
- **Task Rotation**: Press `Alt+Shift+Right` to cycle through the three tasks you'll never finish
- **Quick Settings**: `Alt+Shift+S` opens settings because clicking is for people with time
- **Click-through Design**: The widget ignores your desperate attempts to close it by clicking

### Task Management (Generous Term)
- **Easy Task Addition**: Add tasks you'll immediately forget about
- **In-place Editing**: Edit tasks to make them sound more achievable
- **Quick Remove**: Delete tasks when you give up on them
- **Real-time Updates**: Watch your productivity expectations update in real-time

### User Interface (Overengineered Aesthetics)
- **Catppuccin Theme**: Because default colors are for people without taste
- **Custom Typography**: Iosevka Aile font because Comic Sans wasn't pretentious enough
- **Smooth Animations**: Polished transitions that took longer to implement than your actual tasks
- **Focus States**: Visual feedback for the keyboard shortcuts you'll forget immediately

### Technical Achievements (Questionable Priorities)
- **Built with Electron & React**: Used a framework designed for complex applications to display text
- **TailwindCSS**: Utility-first CSS for a widget that could have been styled with 20 lines of regular CSS
- **Secure IPC Communication**: Enterprise-grade security for your grocery list
- **Responsive Design**: Adapts to different screen sizes despite being a fixed-width bar

## Keyboard Shortcuts (That You'll Never Remember)

| Shortcut | Action | Reality |
|----------|--------|---------|
| `Alt+Shift+Right` | Next Task | You'll press Alt+Tab by mistake |
| `Alt+Shift+S` | Open Settings | You'll accidentally take a screenshot |

## Getting Started (Down the Rabbit Hole)

### Prerequisites (Things You Need First)
- Node.js (because everything needs Node.js now)
- npm or yarn (package managers for your package manager)
- The questionable decision to build desktop apps with web technologies

### Installation (Point of No Return)

```bash
# Clone this monument to procrastination
git clone https://github.com/x1nx3r/silly-widgy.git

# Enter the directory of regret
cd silly-widgy

# Install 500MB of dependencies for a text widget
npm install

# Start the development server (and your journey into madness)
npm run dev
```

### Building (Shipping Your Mistakes)

"For now only Windows build are tested" - the universal disclaimer of solo developers everywhere.

```bash
# Build for Windows (tested on exactly one machine)
npm run build:win

# Build for Linux (works on my Ubuntu VM)
npm run build:linux

# Build for Mac (compiled but never actually run)
npm run build:mac
```

## Customization (Making It Yours)

### Themes (Because Appearance Matters More Than Function)
The app uses Catppuccin Macchiato because you have opinions about color schemes:
```css
src/renderer/src/assets/main.css
```

Modify this file to make your task widget match your terminal, your IDE, and your existential dread.

### Configuration (The Settings You'll Never Change)
Manage tasks through the settings panel that opens with `Alt+Shift+S`, assuming you remember the shortcut exists.

## The Reality of Task Widgets

This widget exists because you thought a floating reminder would solve your productivity problems. In reality:

- You'll spend more time customizing the widget than using it
- The tasks will become outdated within hours
- You'll forget the keyboard shortcuts immediately
- The widget will become invisible background noise within a week
- You'll build another productivity tool to replace this one

### What You'll Actually Use It For
- Displaying "Fix this widget" as your permanent task
- Showing your current mood instead of actual tasks
- Reminding yourself to close the 47 browser tabs you have open
- Procrastinating by adding tasks instead of doing them

## Technical Observations (Architectural Overkill)

You used:
- **Electron**: A 200MB runtime to display 50 characters of text
- **React**: State management for a list of strings
- **TailwindCSS**: 3MB of utility classes for a 200px wide widget
- **IPC Communication**: Inter-process communication for local storage operations

This represents the modern development approach of using enterprise-grade solutions for personal problems.

## Contributing (If You're Brave)

Contributions welcome, though the codebase is probably over-engineered for what it does:

1. Fork the repository (add it to your collection of abandoned forks)
2. Create a feature branch (`git checkout -b feature/EvenMoreUnnecessaryFeature`)
3. Commit your changes (`git commit -m 'Add productivity feature that reduces productivity'`)
4. Push to the branch (`git push origin feature/EvenMoreUnnecessaryFeature`)
5. Open a Pull Request (and wait for the maintainer to remember this project exists)

## Acknowledgments (Credit Where Due)

Thanks to:
- **Electron**: For making desktop development feel like web development
- **React**: For bringing complexity to simple problems
- **TailwindCSS**: For making CSS verbose again
- **Catppuccin**: For the color scheme that makes everything look professional
- **Iosevka**: For the font that says "I care about typography"
- **Coffee**: For the substance that powered this questionable endeavor

## License

MIT License. Use this widget, modify it, distribute it, or learn from its mistakes. The code is free, the productivity improvements are not guaranteed.

## Final Thoughts

This task widget represents the modern developer's relationship with productivity: we'll spend 10 hours building a tool to save 5 minutes of work, then never use the tool.

The widget works exactly as designed - it floats there, shows your tasks, and cycles through them when asked. Whether it actually improves your productivity depends on your relationship with floating text reminders and keyboard shortcuts you'll definitely forget.

Install it, use it for a week, then forget about it like every other productivity tool you've tried. At least this one has nice colors and smooth animations.

Made with caffeine-induced determination and the unshakeable belief that the right productivity tool will finally fix everything wrong with your work habits.
