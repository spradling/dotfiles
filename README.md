# Dotfiles

Personal dotfiles managed with [chezmoi](https://www.chezmoi.io/).

## Quick Start (New Machine)

```bash
# Install chezmoi and apply dotfiles in one command
sh -c "$(curl -fsLS get.chezmoi.io)" -- init --apply spradling
```

Or step by step:

```bash
# Install chezmoi
brew install chezmoi  # macOS
# or
sh -c "$(curl -fsLS get.chezmoi.io)"  # Linux

# Clone and apply
chezmoi init https://github.com/spradling/dotfiles.git
chezmoi apply
```

## What's Included

| File | Purpose |
|------|---------|
| `.zshrc` | Minimal ZSH config with Starship prompt |
| `.aliases` | Shell aliases (git, docker, navigation) |
| `.gitconfig` | Git configuration with useful aliases |
| `.config/starship.toml` | Starship prompt theme |
| `.config/ghostty/config` | Ghostty terminal settings |
| `.config/git/ignore` | Global gitignore |

## Daily Usage

```bash
# Edit a dotfile
chezmoi edit ~/.zshrc
chezmoi apply

# Or edit directly and sync back
vim ~/.zshrc
chezmoi re-add ~/.zshrc

# See what would change
chezmoi diff

# Update from repo
chezmoi update

# Go to chezmoi source directory
chezmoi cd
```

## Machine-Specific Config

This setup uses chezmoi templates for cross-platform support:
- **macOS**: Homebrew paths, macOS-specific aliases
- **Linux**: Appropriate package managers, Linux paths
- **Hostname detection**: Load extra configs for specific machines (e.g., homelab)

## Dependencies

Installed automatically by `run_once_01-install-deps.sh`:
- [Starship](https://starship.rs/) - Fast, customizable prompt
- [Ghostty](https://ghostty.org/) - Fast terminal (macOS only via script)
- [fzf](https://github.com/junegunn/fzf) - Fuzzy finder
- [bat](https://github.com/sharkdp/bat) - Better cat
- [ripgrep](https://github.com/BurntSushi/ripgrep) - Better grep
- [direnv](https://direnv.net/) - Per-directory environment
- zsh-syntax-highlighting
- zsh-autosuggestions

## Local Overrides

For machine-specific config not tracked in git:
- `~/.zshrc.local` - Sourced at end of `.zshrc`
- `~/.aliases.local` - Additional aliases

## Credits

Spring cleaning 2026 🧹
